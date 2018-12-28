import { action } from './';


export const ANALYTICS_LOG_EVENT = 'ANALYTICS_LOG_EVENT';
export const ANALYTICS_LOG_SCREEN_CHANGED = 'ANALYTICS_LOG_SCREEN_CHANGED';


export const logEvent = (event, params) => action(ANALYTICS_LOG_EVENT, {event, params});
export const logScreenChange = (screenName, screenClassOverride) => action(ANALYTICS_LOG_SCREEN_CHANGED, {screenName, screenClassOverride});