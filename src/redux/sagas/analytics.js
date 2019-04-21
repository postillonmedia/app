import { all, select, takeEvery, call } from 'redux-saga/effects';

import Firebase from './../../utils/firebase';

import { ANALYTICS_LOG_EVENT, ANALYTICS_LOG_SCREEN_CHANGED } from './../actions/analytics';

import {getAppAnalytics} from '../selectors/settings';


/******************************************************************************/
/******************************* HANDLERS *************************************/
/******************************************************************************/

function* onLogEvent(action) {
    let { event, params } = action;

    if (event) {
        Firebase.analytics().logEvent(event, params || {});
    }
}

function* onScreenChanged(action) {
    const { screenName, screenClassOverride } = action;

    if (screenName) {
        Firebase.analytics().setCurrentScreen(screenName, screenClassOverride || null);
    }
}

function* initialize() {
    const enabled = yield select(getAppAnalytics);

    Firebase.analytics().setAnalyticsCollectionEnabled(enabled);
}


/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

function* watchOnLogEvent() {
    yield takeEvery(ANALYTICS_LOG_EVENT, onLogEvent);
}

function* watchOnScreenChanged() {
    yield takeEvery(ANALYTICS_LOG_SCREEN_CHANGED, onScreenChanged);
}


export default function* analytics() {
    yield all([
        watchOnLogEvent(),
        watchOnScreenChanged(),

        initialize(),
    ]);
}