import ReactNative, { Alert } from 'react-native';
import { all, call, takeEvery, put, select } from 'redux-saga/effects';

import { isPersistorBootstrapped } from '../store';

import Firebase from '../../utils/firebase';
import Config from '../../constants/config';

import {
    setNotification,

    SETTINGS_APP_THEME,
    SETTINGS_APP_ANALYTICS,
    SETTINGS_APP_NOTIFICATIONS,
} from '../actions/settings/app';

import { getAppNotifications } from '../selectors/settings';


function* handleAnalyticsEnabledChanged(action) {
    const { enabled } = action;

    try {
        const analytics = Firebase.analytics();

        yield call([analytics, analytics.setAnalyticsCollectionEnabled], enabled);

        Alert.alert('Info', 'Firebase-Analytics ' + (enabled ? 'aktiviert' : 'deaktiviert'));
    } catch (error) {
        Alert.alert('Error', error.message);
    }
}

function* handleNotificationEnabledChanged(action) {
    const { enabled } = action;

    const messaging = Firebase.messaging();

    if (enabled) {
        // register for messages
        const hasPermissions = yield call([messaging, messaging.hasPermission]);

        if (!hasPermissions) {
            try {

                yield call([messaging, messaging.requestPermission]);

            } catch (error) {
                console.error(error);

                Alert.alert('Error', error.message);

                return;
            }
        }

        // subscribe for topic
        yield call(setNotificationsEnabled, true);

    } else {
        // unsubscribe
        yield call(setNotificationsEnabled, false);
    }
}

function* initialize() {
    try {
        // wait for redux-persist to restore the persisted state
        yield isPersistorBootstrapped;

        // setup notifications
        const messaging = Firebase.messaging();

        let hasPermissions = yield call([messaging, messaging.hasPermission]);

        const receiveNotifications = yield select(getAppNotifications);

        if (!hasPermissions && receiveNotifications) {
            try {
                yield call([messaging, messaging.requestPermission]);
            } catch (error) {
                console.error(error);

                yield put(setNotification(false));
                yield call(setNotificationsEnabled, false);
            }
        } else if (!hasPermissions) {
            yield put(setNotification(false));
            yield call(setNotificationsEnabled, false);
        } else {
            yield call(setNotificationsEnabled, receiveNotifications);
        }
    } catch (e) {
        console.error(e);
    }
}

function* setNotificationsEnabled(enabled) {
    const messaging = Firebase.messaging();
    const iid = Firebase.iid();

    if (enabled) {
        yield call([iid, iid.get]);
        yield call([iid, iid.getToken]);

        // subscribe for topic
        yield call([messaging, messaging.subscribeToTopic], Config.notifications.topics.automatic);
    } else {
        // unsubscribe
        yield call([messaging, messaging.unsubscribeFromTopic], Config.notifications.topics.automatic);

        yield call([iid, iid.deleteToken]);
        yield call([iid, iid.delete]);
    }
}



function* watchOnThemeChanged() {
    yield takeEvery(SETTINGS_APP_THEME, handleThemeChanged)
}

function* watchOnAnalyticsEnabledChanged() {
    yield takeEvery(SETTINGS_APP_ANALYTICS, handleAnalyticsEnabledChanged)
}

function* watchOnNotificationEnabledChanged() {
    yield takeEvery(SETTINGS_APP_NOTIFICATIONS, handleNotificationEnabledChanged)
}


export default function* settingsSaga() {
    yield all([
        // watchOnThemeChanged(),

        watchOnAnalyticsEnabledChanged(),

        watchOnNotificationEnabledChanged(),

        initialize(),
    ]);
}
