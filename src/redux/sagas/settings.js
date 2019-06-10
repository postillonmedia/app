import ReactNative, { Alert, Platform } from 'react-native';
import { all, call, delay, take, takeEvery, put, select } from 'redux-saga/effects';

import { ThemeManager } from '@postillon/react-native-theme';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import { isPersistorBootstrapped } from '../store'

import Firebase from '../../utils/firebase';
import Config from '../../constants/config';
import { Themes, DefaultTheme, DarkTheme } from '../../constants/themes';

import {
    setNotification,

    SETTINGS_APP_THEME,
    SETTINGS_APP_ANALYTICS,
    SETTINGS_APP_NOTIFICATIONS,
} from '../actions/settings/app';

import { getAppNotifications, getAppTheme } from '../selectors/settings';


function* handleThemeChanged(action) {
    const { theme } = action;

    try {
        const constants = ThemeManager.getConstantsForTheme(theme);

        const color = constants.colors.tabs.background;
        const useLightIconColor = theme === Themes.DEFAULT;

        changeNavigationBarColor(color, useLightIconColor);
    } catch (error) {
        console.error(error);
    }
}

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

        // setup theme
        const theme = yield select(getAppTheme);
        yield call(handleThemeChanged, { theme });

        // setup notifications
        const messaging = Firebase.messaging();

        const hasPermissions = yield call([messaging, messaging.hasPermission]);

        if (!hasPermissions) {
            yield put(setNotification(false));
            yield call(setNotificationsEnabled, false);
        } else {
            const receiveNotifications = yield select(getAppNotifications);

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
        watchOnThemeChanged(),

        watchOnAnalyticsEnabledChanged(),

        watchOnNotificationEnabledChanged(),

        initialize(),
    ]);
}