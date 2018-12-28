/**
 * Created by DanielL on 07.06.2017.
 */

import { action } from '../';


export const SETTINGS_APP_THEME = 'SETTINGS_APP_THEME';
export const SETTINGS_APP_LOCALE = 'SETTINGS_APP_LOCALE';

export const SETTINGS_APP_NOTIFICATIONS = 'SETTINGS_APP_NOTIFICATIONS';

export const SETTINGS_APP_ANALYTICS = 'SETTINGS_APP_ANALYTICS';



export const setTheme = theme => action(SETTINGS_APP_THEME, {theme});
export const setLocale = locale => action(SETTINGS_APP_LOCALE, {locale});

export const setNotification = enabled => action(SETTINGS_APP_NOTIFICATIONS, {enabled});

export const setAnalytics = enabled => action(SETTINGS_APP_ANALYTICS, {enabled});
