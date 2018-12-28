/**
 * Created by DanielL on 07.06.2017.
 */

// import action constants
import {
    SETTINGS_APP_THEME,
    SETTINGS_APP_LOCALE,

    SETTINGS_APP_NOTIFICATIONS,
    SETTINGS_APP_NOTIFICATIONS_SOUND,
    SETTINGS_APP_NOTIFICATIONS_VIBRATION,

    SETTINGS_APP_ANALYTICS
} from '../../actions/settings/app';

import { LANGUAGE_DEVICE_APP_COMPATIBLE } from '../../../constants/languages';
import { Themes } from '../../../constants/themes/index';

// initial state
const initialState = {
    theme: Themes.DEFAULT,
    locale: LANGUAGE_DEVICE_APP_COMPATIBLE,
    notifications: true,
    notificationsSound: false,
    notificationsVibration: false,
    analytics: true,
};

// export reducer
export default function (state = initialState, action) {
    switch (action.type) {

        case SETTINGS_APP_THEME: {
            return Object.assign({}, state, {
                theme: action.theme,
            });
        }

        case SETTINGS_APP_LOCALE: {
            return Object.assign({}, state, {
                locale: action.locale,
            });
        }

        case SETTINGS_APP_NOTIFICATIONS: {
            return Object.assign({}, state, {
                notifications: action.enabled,
            });
        }

        case SETTINGS_APP_NOTIFICATIONS_SOUND: {
            return Object.assign({}, state, {
                notificationsSound: action.enabled,
            });
        }

        case SETTINGS_APP_NOTIFICATIONS_VIBRATION: {
            return Object.assign({}, state, {
                notificationsVibration: action.enabled,
            });
        }

        case SETTINGS_APP_ANALYTICS: {
            return Object.assign({}, state, {
                analytics: action.enabled,
            });
        }

        default:
            return state;
    }
}