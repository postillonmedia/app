import { buffers, eventChannel } from 'redux-saga';
import { actionChannel, all, call, cancel, cancelled, delay, flush, fork, put, race, select, spawn, take, takeEvery, takeLatest } from 'redux-saga/effects';
import {
    ARCHIVE_CONTROL_SET_MONTH,
    ARCHIVE_CONTROL_SET_YEAR,
    ARCHIVE_CONTROL_SET_YEAR_AND_SELECT_MONTH,
    ARCHIVE_INITIALIZE, ARCHIVE_RELOAD, ARCHIVE_REQUEST_SUCCESS
} from "../actions/archive";
import * as ArchiveActions from "../actions/archive";

import Articles from './../../realm/db/articles';
import {getMonth, getNextPageToken, getYear} from "../selectors/archive";
import {getAppLocale} from "../selectors/settings";
import {getBlogByLanguage} from "../../constants/blogs";
import {realmCollectionChangeEmitter} from "./emitters/realm";
import Config from "../../constants/config";
import {posts} from "../../utils/blogger/api/v3";
import * as ArticleSaga from "./article";
import * as PageActions from "../actions/pages";



const months = {
    0: 31,
    1: 28,
    2: 31,
    3: 30,
    4: 31,
    5: 30,
    6: 31,
    7: 31,
    8: 30,
    9: 31,
    10: 30,
    11: 31,
};

function getDaysCountOfMonthForYear(month, year) {
    if (year % 4 === 0 && month === 1) {
        // Schaltjahr
        return 29;
    } else {
        return months[month];
    }
}

function* handleInitialize(action) {
    yield call(setDbSourceByYearAndMonth);
}

function* handleYearSelectionChange(action) {
    const { year } = action;

    yield call(setDbSourceByYearAndMonth, year);
}

function* handleMonthSelectionChange(action) {
    const { month } = action;

    yield call(setDbSourceByYearAndMonth, null, month);
}

let watchTask;

function* setDbSourceByYearAndMonth(year = null, month = null) {
    if (!year) year = yield select(getYear);
    if (!month) month = yield select(getMonth);

    if (watchTask) {
        yield cancel(watchTask);
    }

    const locale = yield select(getAppLocale);
    const blogId = yield call(getBlogByLanguage, locale);

    const start = new Date(year, month, 1);
    const end = new Date(year, month, getDaysCountOfMonthForYear(month, year), 23, 59, 59, 999);

    const articles = Articles.Articles.filtered('published > $0 AND published <= $1 AND blog.id == $2', start, end, blogId).sorted('published');

    watchTask = yield fork(watchForCurrentArchiveChanges, articles);

    yield call(request, start, end);
}

function* watchForCurrentArchiveChanges(realm) {
    const channel = realmCollectionChangeEmitter(realm);

    try {
        while (true) {
            const { collection } = yield take(channel);

            yield put(ArchiveActions.setDbSource(collection));
        }
    } finally {
        if (yield cancelled()) {
            channel.close();
        }
    }
}

function* handleReload(action) {
    // TODO: cancel all prev requests

    yield call(request);

    yield put(ArchiveActions.reloadFinished());
}

function* request(start, end) {
    if (!start || !end) {
        const year = yield select(getYear);
        const month = yield select(getMonth);

        start = start || new Date(year, month, 1);
        end = end || new Date(year, month, getDaysCountOfMonthForYear(month, year), 23, 59, 59, 999);
    }

    yield put(ArchiveActions.request());

    const locale = yield select(getAppLocale);
    const nextPageToken = yield select(getNextPageToken);
    const blogId = yield call(getBlogByLanguage, locale);

    const request = {
        blogId: blogId,
        key: Config.keys.blogger,

        pageToken: nextPageToken,
        maxResults: 500,

        startDate: start.toISOString(),
        endDate: end.toISOString(),

        fetchBodies: true,
        fetchImages: true,
        fields: 'nextPageToken,items(published,updated,labels,id,url,etag,title,content,images/url)',
        prettyPrint: false,
    };

    while (true) {
        try {
            const { articles = [], nextPageToken, etag } = yield call(posts.list, request);

            yield put(ArchiveActions.requestSuccess(articles, nextPageToken, etag, blogId));

            return {
                articles,
                nextPageToken,
                etag
            };
        } catch(error) {
            yield put(ArchiveActions.requestFailure(error));
            yield delay(2000);
        }
    }
}

function* handleRequestSuccess(action) {
    const { articles, nextPageToken, blogId } = action;

    if (nextPageToken) {
        // request next
        yield fork(request);
    }

    yield put(ArchiveActions.process());

    try {
        // process json from api
        const processedArticles = [];

        for (let i = 0; i < articles.length; i++) {
            const article = articles[i];
            const processedArticle = yield call(ArticleSaga.process, blogId, article);

            processedArticle && processedArticles.push(processedArticle);
        }

        yield call(Articles.createOrUpdateArticles, processedArticles);

        yield put(ArchiveActions.processSuccess(processedArticles, blogId));
    } catch (e) {
        yield put(ArchiveActions.processFailure(e, blogId));
    }
}


function* watchOnInitialize() {
    yield takeLatest(ARCHIVE_INITIALIZE, handleInitialize);
}

function* watchOnReload() {
    yield takeLatest(ARCHIVE_RELOAD, handleReload);
}

function* watchOnYearSelectionChange() {
    yield takeLatest([ARCHIVE_CONTROL_SET_YEAR, ARCHIVE_CONTROL_SET_YEAR_AND_SELECT_MONTH], handleYearSelectionChange);
}
function* watchOnMonthSelectionChange() {
    yield takeLatest(ARCHIVE_CONTROL_SET_MONTH, handleMonthSelectionChange);
}

function* watchOnRequestSuccess() {
    yield takeEvery(ARCHIVE_REQUEST_SUCCESS, handleRequestSuccess);
}


export default function* archiveSagas() {
    yield all([
        watchOnInitialize(),
        watchOnReload(),

        watchOnYearSelectionChange(),
        watchOnMonthSelectionChange(),

        watchOnRequestSuccess(),
    ]);
}