import {all, call, delay, put, select, take, takeEvery, takeLatest} from 'redux-saga/effects';

import parse from 'url-parse';

import { posts } from '../../utils/blogger/api/v2';
import SearchActions, {
    SEARCH_END_REACHED, SEARCH_SET_CATEGORY, SEARCH_SET_PERIOD,
    SEARCH_SUBMIT
} from '../actions/search';
import * as AnalyticsActions from './../actions/analytics';

import { getSearch, getSearchString } from '../selectors/search';
import { Periods, getDateByPeriod } from '../../constants/periods';
import {events} from "../../utils/firebase";



/******************************************************************************/
/******************************* HANDLERS *************************************/
/******************************************************************************/

function* endReached() {
    console.log('SEARCH end reached');
}

function* request(searchString) {
    const { blogId, category, period, search, results } = yield select(getSearch);

    if (typeof searchString !== 'string' && typeof search === 'string') {
        searchString = search;
    } else if (typeof searchString !== 'string' && typeof search !== 'string') {
        return;
    }

    yield put(SearchActions.request());

    const startIndex = 1 + (results.length || 0);
    const updatedMin = getDateByPeriod(period);

    const request = {
        blogId,
        q: searchString,
        'start-index': startIndex,
    };

    if (category && typeof category === 'string') {
        request['categories'] = [category];
    }

    if (period && period !== Periods.NoFilter) {
        request['updated-min'] = updatedMin.toISOString();
    }

    yield put(AnalyticsActions.logEvent(events.ANALYTICS_EVENT_ARTICLE_SEARCHED, {
        blog: blogId,
        query: request.q,
        category,
        period,
    }));

    while (true) {
        try {

            const { feed, error } = yield call(posts.list, request);

            if (error) {
                throw error;
            }

            // convert feeditems
            const articles = feed.items && feed.items.length && feed.items.length > 0 && feed.items.reduce((articles, item, index) =>  {
                if ((item.links && item.links.alternate) && (item.published && +item.published > +updatedMin)) {
                    const url = parse(item.links.alternate);

                    if (url && typeof url.pathname === 'string' && url.pathname.length > 0) {
                        const article = {
                            id: blogId + url.pathname,

                            title: item.title,
                            description: item.description,

                            image: item.image,
                            thumbnail: item.thumbnail,
                        };

                        articles.push(article);
                    }
                }

                return articles;
            }, []);

            yield put(SearchActions.requestSuccess(articles));

            return articles;

        } catch (error) {
            yield put(SearchActions.requestFailure(error));
            yield delay(2000);
        }
    }
}


/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

function* watchOnSearch() {
    while (true) {
        const action = yield take([SEARCH_SUBMIT, SEARCH_SET_PERIOD, SEARCH_SET_CATEGORY]);

        let searchString = action.search;

        if (!searchString) {
            searchString = yield select(getSearchString);
        }

        if (searchString && typeof searchString === 'string' && searchString.length > 0) {
            yield call(request, searchString);
        }
    }
}

function* watchOnEndReached() {
    yield takeLatest(SEARCH_END_REACHED, request);
}


export default function* searchSaga() {
    yield all([
        watchOnSearch(),

        watchOnEndReached(),
    ]);
}