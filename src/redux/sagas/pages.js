import { buffers } from 'redux-saga';
import { actionChannel, all, call, delay, flush, put, putResolve, race, select, spawn, take, takeEvery } from 'redux-saga/effects';

import { getPageByBlogAndCategory } from '../selectors/pages';

import {
    PAGE_END_REACHED, PAGE_INITIALIZE, PAGE_PAGINATE_NETWORK, PAGE_RELOAD, PAGE_REQUEST_CANCEL,
    PAGE_REQUEST_SUCCESS
} from '../actions/pages';
import * as PageActions from '../actions/pages';
import * as ArticleSaga from './article';

import { realmCollectionChangeEmitter } from './emitters/realm';

import { posts } from '../../utils/blogger/api/v3';

import Config from './../../constants/config';

import Realm from './../../realm';
import Articles from './../../realm/db/articles';
import Blogs from './../../realm/db/blogs';
import Categories from './../../realm/db/categories';


/******************************************************************************/
/******************************* HANDLERS *************************************/
/******************************************************************************/

function* requestArticles({ blogId, category }) {
    yield put(PageActions.request(blogId, category));

    const { nextPageToken } = yield select(getPageByBlogAndCategory, blogId, category);

    const request = {
        blogId: blogId,

        labels: category,
        pageToken: nextPageToken,
        fetchBodies: true,
        fetchImages: true,
        fields: 'nextPageToken,items(published,updated,labels,id,url,etag,title,content,images/url)',
        prettyPrint: false,
    };

    while (true) {
        try {
            const { articles = [], nextPageToken, etag } = yield call(posts.list, request);

            yield put(PageActions.requestSuccess(articles, nextPageToken, etag, blogId, category));

            return {
                articles,
                nextPageToken,
                etag
            };
        } catch(error) {
            yield put(PageActions.requestFailure(error, blogId, category));
            yield call(delay, 2000);
        }
    }
}

function* processArticles(action) {
    const { blogId, category, articles, etag } = action;

    yield put(PageActions.process(blogId, category));

    try {
        // process json from api
        const processedArticles = [];

        for (let i = 0; i < articles.length; i++) {
            const article = articles[i];
            const processedArticle = yield call(ArticleSaga.process, blogId, article);

            processedArticle && processedArticles.push(processedArticle);
        }

        yield call(Articles.createOrUpdateArticles, processedArticles);

        yield put(PageActions.processSuccess(processedArticles, blogId, category));
    } catch (e) {
        yield put(PageActions.processFailure(e, blogId, category));
    }
}

function* initializePage(action) {
    const { blogId, category } = action;

    let articlesRealmObject;
    let blogRealmObject = Blogs.getBlogById(blogId);

    // add blog to DB if not present
    if (!blogRealmObject) {
        blogRealmObject = yield call(Blogs.createBlog, {
            id: blogId,

            articles: [],
            categories: [],
        });
    }

    if (!category) {
        articlesRealmObject = blogRealmObject.articles.sorted('published', true);
    } else {
        let categoryRealmObject = Categories.getCategoryByBlogAndSelector(blogId, category);

        if (!categoryRealmObject) {
            const categoryId = blogId + '_' + category;

            categoryRealmObject = yield call(Categories.createCategory, {
                id: categoryId,
                selector: category,

                blog: blogRealmObject,
                articles: [],
            });
        }

        articlesRealmObject = categoryRealmObject.articles.sorted('published', true);
    }

    const page = yield select(getPageByBlogAndCategory, blogId, category);

    if (!page) {
        // spawn actionChannel for this page
        yield spawn(watchOnDbChanges, articlesRealmObject, blogId, category);
        yield spawn(watchOnPagePaginateNetwork, blogId, category);
    }

    // initialize object in reducer
    yield putResolve(PageActions.setDbSource(articlesRealmObject, blogId, category));

    // trigger reload
    yield put(PageActions.reload(blogId, category));
}

function* reloadPage(action) {
    const { blogId, category } = action;

    yield put(PageActions.requestCancel(blogId, category));

    yield call(requestArticles, action);

    yield put(PageActions.reloadFinished(blogId, category));
}

function* paginateArticles(action) {
    const { blogId, category } = action;

    yield put(PageActions.paginateNetworkBegin(blogId, category));

    yield call(requestArticles, action);

    yield put(PageActions.paginateNetworkEnd(blogId, category));
}

function* cleanCache() {
    try {
        const limit = new Date(Date.now() - Config.cacheTime);

        const oldArticles = Articles.Articles.filtered('opened < $0 AND archived == null', limit);

        if (oldArticles && oldArticles.length > 0) {
            Realm.write(() => {
                console.log('CacheControl: Delete ' + oldArticles.length + ' articles.');

                Realm.delete(oldArticles);
            });
        } else {
            console.log('CacheControl: No articles found to delete.');
        }
    } catch (e) {
        console.warn('Error in Cache cleaning:', e);
    }

}


/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

function* watchOnPageInitialize() {
    yield takeEvery(PAGE_INITIALIZE, initializePage);
}

function* watchOnPageReload() {
    yield takeEvery(PAGE_RELOAD, reloadPage);
}

function* watchOnPageRequestSuccess() {
    yield takeEvery(PAGE_REQUEST_SUCCESS, processArticles);
}

function* watchOnPageEndReached() {
    while (true) {
        const action = yield take(PAGE_END_REACHED);
        const { blogId, category } = action;

        const page = yield select(getPageByBlogAndCategory, blogId, category);

        // paginate only when has a next page
        if (page.nextPageToken) {
            const nextPageNumber = page.pageNumber + 1;

            yield put(PageActions.paginate(nextPageNumber, blogId, category));

            yield put(PageActions.paginateNetwork(blogId, category));
        }
    }
}

function* watchOnPagePaginateNetwork(blogId, category = null) {
    const requestChannel = yield actionChannel(action => action.type === PAGE_PAGINATE_NETWORK && action.blogId === blogId && action.category === category, buffers.expanding(10));

    while (true) {
        const action = yield take(requestChannel);

        const { task, cancel } = yield race({
            task: call(paginateArticles, action),
            cancel: take(action => action.type === PAGE_REQUEST_CANCEL && action.blogId === blogId && action.category === category),
        });

        if (cancel !== undefined) {
            console.log(`Cancel requests for blog '${blogId}' in category: '${category || 'all'}'`);

            yield flush(requestChannel);
        }
    }
}

function* watchOnDbChanges(realmCollection, blogId, category = null) {
    const changesChannel = realmCollectionChangeEmitter(realmCollection);

    while (true) {
        const event = yield take(changesChannel);
        const { changes, collection } = event;

        yield put(PageActions.setDbSource(collection, blogId, category));
    }
}


export default function* pagesSaga() {
    yield all([
        watchOnPageInitialize(),
        watchOnPageReload(),

        watchOnPageEndReached(),

        watchOnPageRequestSuccess(),

        // execute once
        cleanCache(),
    ]);
}