import { all, call, delay, fork, take, takeEvery, takeLatest, put, race } from 'redux-saga/effects';

import { Parser, DomHandler, DomUtils } from 'htmlparser2';
import entities from 'entities';
import parse from 'url-parse';

import RNFetchBlob from 'react-native-fetch-blob';

import {
    ARTICLE_OPEN, ARTICLE_PROCESS,
    ARTICLE_REQUEST, ARTICLE_SET,

    ARTICLE_ARCHIVE_ADD_WITH_PICTURES, ARTICLE_ARCHIVE_ADD_WITHOUT_PICTURES,
    ARTICLE_ARCHIVE_REMOVE
} from './../actions/article';
import * as ArticleActions from './../actions/article';
import * as AnalyticsActions from './../actions/analytics';

import { BLOG_DE, BLOG_EN } from './../../constants/blogs'
import { getCategoriesObjectByBlogId } from './../../constants/categories';

import { events } from '../../utils/firebase';
import { posts } from '../../utils/blogger/api/v3';

import Realm from './../../realm';
import Articles from './../../realm/db/articles';
import Blogs from './../../realm/db/blogs';
import Labels from './../../realm/db/labels';
import Categories from './../../realm/db/categories';



/******************************************************************************/
/******************************* FUNCTIONS ************************************/
/******************************************************************************/

function getImages(html) {
    return new Promise((resolve, reject) => {
        try {
            const handler = new DomHandler((error, dom) => {
                if (error) {
                    throw error;
                }

                const images = DomUtils.find((elem) => elem && elem.name && elem.name === 'img' && elem.attribs && elem.attribs.src && elem.attribs.src.length > 0, dom, true);

                const processedImages = images.map(image => ({
                    url: image.attribs.src,
                }));

                resolve(processedImages);
            });
            const parser = new Parser(handler);

            parser.write(html);
            parser.end();
        } catch (e) {
            reject(e)
        }
    });
}

export function* process(blogId, rawArticle) {
    const articleUrl = parse(rawArticle.url);
    rawArticle.path = articleUrl.pathname || rawArticle.path;

    const internalArticleId = blogId + rawArticle.path;

    const blog = Blogs.getBlogById(blogId);
    const categoriesConstants = getCategoriesObjectByBlogId(blogId);

    const cachedArticle = Articles.getArticleById(internalArticleId);
    const isUpdate = cachedArticle && cachedArticle.etag !== rawArticle.etag || false;

    if (!cachedArticle || isUpdate) {

        // process title
        const title = entities.decode(rawArticle.title, 1) || rawArticle.title;

        // process labels and categories
        const labels = [];
        const categories = [];

        for (let i = 0; i < (rawArticle.labels && rawArticle.labels.length) || 0; i++) {
            const labelContent = rawArticle.labels[i];

            let label = Labels.getLabelByLabelContent(labelContent);

            if (!label) {
                label = yield call(Labels.createLabel, {
                    label: labelContent,
                    blog: blog,

                    articles: [],
                });
            }

            labels.push(label);

            // process categories
            if (labelContent in categoriesConstants && !!categoriesConstants[labelContent]) {
                const categorySelector = labelContent;

                let category = Categories.getCategoryByBlogAndSelector(blogId, categorySelector);

                if (!category) {
                    const categoryId = blogId + '_' + categorySelector;

                    category = yield call(Categories.createCategory, {
                        id: categoryId,
                        selector: categorySelector,

                        blog: blog,
                        articles: [],
                    });
                }

                categories.push(category);
            }
        }

        // process images
        const images = yield call(getImages, rawArticle.content);

        // article image
        const image = rawArticle.images && rawArticle.images.length > 0 ? rawArticle.images[0].url : (images && images.length > 0 ? images[0].url : null);

        // process article
        const article = {
            published: new Date(rawArticle.published),
            updated: new Date(rawArticle.updated),
            loaded: new Date(),

            id: internalArticleId,
            articleId: rawArticle.id,
            url: rawArticle.url,
            path: rawArticle.path,
            etag: rawArticle.etag,

            title: title,
            html: rawArticle.content,

            blog: blog,
            labels: labels,
            categories: categories,

            image: image,
            images: images,
        };

        return article;
    } else {
        return false;
    }
}


/******************************************************************************/
/******************************* HANDLERS *************************************/
/******************************************************************************/

function* handleArticleOpen(action) {
    const { id } = action;

    const article = Articles.getArticleById(id);

    if (article) {
        // article is present in DB

        yield put(ArticleActions.setArticle(id, article));
    } else {
        // article is not in DB

        yield put(ArticleActions.request(id));
    }
}

function* handleArticleRequest(action) {
    const { id } = action;

    try {
        const firstSlashIndex = id.indexOf('/');
        const blogId = id.slice(0, firstSlashIndex);
        const path = id.slice(firstSlashIndex);

        if (blogId === BLOG_DE || blogId === BLOG_EN) {
            for (let i = 0; i < 3; i++) {
                try {
                    const { article: rawArticle } = yield call(posts.getByPath, {
                        blogId,
                        path,

                        fields: 'published,updated,labels,id,url,etag,title,content,images/url',
                        prettyPrint: false,
                    });

                    yield put(ArticleActions.process(id, blogId, path, rawArticle));

                    return rawArticle;
                } catch (e) {
                    if (i < 2) {
                        yield delay(1000);
                    }
                }
            }

            // attempts failed after 3 times
            const error = new Error('Article could not be loaded from Server');

            yield put(ArticleActions.requestFailure(id, error));
        } else {
            throw new Error('Unknown BlogID in articleID');
        }
    } catch (e) {
        yield put(ArticleActions.requestFailure(id, e));
    }
}

function* handleProcessArticle(action) {
    const {
        blogId,
        id,
        path,
        article: rawArticle,
    } = action;

    try {
        // add path to article because google doesn't send it
        rawArticle.path = path;

        // process rawArticle
        const processedArticle = yield call(process, blogId, rawArticle);

        let article;

        if (processedArticle) {
            article = yield call(Articles.createOrUpdateArticleById, id, processedArticle);
        } else {
            article = Articles.getArticleById(id);
        }

        if (!article) {
            throw new Error('Article with ID "' + id + '" could not be found');
        }

        yield put(ArticleActions.setArticle(id, article));

        return article;
    } catch (e) {
        yield put(ArticleActions.processFailure(id, e));
    }
}

function* handleArticleSet(action) {
    const { article } = action;

    yield put(AnalyticsActions.logEvent(events.ANALYTICS_EVENT_ARTICLE_OPENED, {
        id: article.id,
        title: article.title,
        blog: article.blog.id,
    }));

    Realm.write(() => {
        article.opened = new Date();
    });
}



function* handleArticleArchiveWithoutPictures(action) {
    const tasks = [];

    action.event = events.ANALYTICS_EVENT_ARTICLE_SAVED_TEXT_ONLY;

    yield call(handleArticleArchive, action, tasks);
}

function* handleArticleArchiveWithPictures(action) {
    const tasks = [
        downloadImages,
    ];

    action.event = events.ANALYTICS_EVENT_ARTICLE_SAVED;

    yield call(handleArticleArchive, action, tasks);
}

function* handleArticleArchive(action, tasks) {
    const { id, event } = action;

    try {

        const article = Articles.getArticleById(id);

        yield put(ArticleActions.setArchivatingState(id, true));

        const { task, cancel } = yield race({
            task: all(tasks.map(task => call(task, action, article))),
            cancel: take(action => action.type === ARTICLE_ARCHIVE_REMOVE && action.id === id),
        });

        if (!cancel) {
            yield call(archivateArticle, action, article);
        }

        yield put(ArticleActions.setArchivatingState(id, false));

        if (event) {
            yield put(AnalyticsActions.logEvent(event, {
                id: article.id,
                title: article.title,
                blog: article.blog.id,
            }));
        }

    } catch (e) {
        // TODO: error handling
    }

}

function* handleArticleRemoveFromArchive(action) {
    const { id } = action;

    const article = Articles.getArticleById(id);

    if (!article) {
        return;
    }

    yield call(removeAllImagesFromArticle, action, article);

    yield call(removeArticleFromArchive, action, article);

    yield put(AnalyticsActions.logEvent(events.ANALYTICS_EVENT_ARTICLE_REMOVED, {
        id: article.id,
        title: article.title,
        archived: article.archived,
        blog: article.blog.id,
    }));
}

function* downloadImages(action, article) {
    yield all(article.images.map(image => fork(processImage, article, image)));
}

function* processImage(article, image) {
    try {
        const response = yield call(downloadImage, image.url, article.id);

        Realm.write(() => {
            image.offline = true;
            image.path = response.path();
        });

        return image;
    } catch (e) {
        // TODO: error handling
    }
}

function* downloadImage(url, session) {
    const request = RNFetchBlob.config({
        session,
        fileCache : true
    });

    const response = yield call([request, request.fetch], 'GET', url);

    return response;
}

function* removeAllImagesFromArticle(action, article) {
    const images = article.images;

    for (let i = 0; i < images.length; i++) {
        const image = images[i];

        Realm.write(() => {
            image.offline = false;
            image.path = undefined;
        });
    }

    const session = RNFetchBlob.session(article.id);

    yield call([session, session.dispose]);
}

function* archivateArticle(action, article) {
    Realm.write(() => {
        article.archived = new Date();
    });

    yield put(ArticleActions.archivedArticle(article.id));
}

function* removeArticleFromArchive(action, article) {
    Realm.write(() => {
        article.archived = undefined;
    });

    yield put(ArticleActions.removedArticle(article.id));
}



/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

function* watchOnArticleOpen() {
    yield takeEvery(ARTICLE_OPEN, handleArticleOpen);
}

function* watchOnArticleRequest() {
    yield takeLatest(ARTICLE_REQUEST, handleArticleRequest);
}

function* watchOnArticleProcess() {
    yield takeEvery(ARTICLE_PROCESS, handleProcessArticle);
}

function* watchOnArticleSet() {
    yield takeEvery(ARTICLE_SET, handleArticleSet);
}

function* watchOnArticleArchiveWithoutPictures() {
    yield takeEvery(ARTICLE_ARCHIVE_ADD_WITHOUT_PICTURES, handleArticleArchiveWithoutPictures);
}

function* watchOnArticleArchiveWithPictures() {
    yield takeEvery(ARTICLE_ARCHIVE_ADD_WITH_PICTURES, handleArticleArchiveWithPictures);
}

function* watchOnArticleRemoveFromArchive() {
    yield takeEvery(ARTICLE_ARCHIVE_REMOVE, handleArticleRemoveFromArchive);
}



export default function* articleSaga() {
    yield all([
        watchOnArticleOpen(),

        watchOnArticleRequest(),
        watchOnArticleProcess(),

        watchOnArticleArchiveWithoutPictures(),
        watchOnArticleArchiveWithPictures(),
        watchOnArticleRemoveFromArchive(),

        watchOnArticleSet(),
    ]);
}