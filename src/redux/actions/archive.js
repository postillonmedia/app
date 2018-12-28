import { action } from './';

export const ARCHIVE_CONTROL_SET_YEAR = 'ARCHIVE_CONTROL_SET_YEAR';
export const ARCHIVE_CONTROL_SET_YEAR_AND_SELECT_MONTH = 'ARCHIVE_CONTROL_SET_YEAR_AND_SELECT_MONTH';
export const ARCHIVE_CONTROL_SET_MONTH = 'ARCHIVE_CONTROL_SET_MONTH';
export const ARCHIVE_CONTROL_SET_SELECTOR = 'ARCHIVE_CONTROL_SET_SELECTOR';

export const ARCHIVE_INITIALIZE = 'ARCHIVE_INITIALIZE';

export const ARCHIVE_SET_DB_SOURCE = 'ARCHIVE_SET_DB_SOURCE';

export const ARCHIVE_RELOAD = 'ARCHIVE_RELOAD';
export const ARCHIVE_RELOAD_FINISHED = 'ARCHIVE_RELOAD_FINISHED';

export const ARCHIVE_REQUEST = 'ARCHIVE_REQUEST';
export const ARCHIVE_REQUEST_SUCCESS = 'ARCHIVE_REQUEST_SUCCESS';
export const ARCHIVE_REQUEST_FAILURE = 'ARCHIVE_REQUEST_FAILURE';

export const ARCHIVE_PROCESS = 'ARCHIVE_PROCESS';
export const ARCHIVE_PROCESS_SUCCESS = 'ARCHIVE_PROCESS_SUCCESS';
export const ARCHIVE_PROCESS_FAILURE = 'ARCHIVE_PROCESS_FAILURE';


export const setYear = year => action(ARCHIVE_CONTROL_SET_YEAR, { year });
export const setYearAndSelectMonth = year => action(ARCHIVE_CONTROL_SET_YEAR_AND_SELECT_MONTH, { year });
export const setMonth = month => action(ARCHIVE_CONTROL_SET_MONTH, { month });
export const setSelector = state => action(ARCHIVE_CONTROL_SET_SELECTOR, { state });

export const initialize = () => action(ARCHIVE_INITIALIZE);

export const setDbSource = articles => action(ARCHIVE_SET_DB_SOURCE, { articles });

export const reload = () => action(ARCHIVE_RELOAD);
export const reloadFinished = () => action(ARCHIVE_RELOAD_FINISHED);

export const request = () => action(ARCHIVE_REQUEST);
export const requestSuccess = (articles, nextPageToken, etag, blogId) => action(ARCHIVE_REQUEST_SUCCESS, { articles, nextPageToken, etag, blogId });
export const requestFailure = (error) => action(ARCHIVE_REQUEST_FAILURE, { error });

export const process = () => action(ARCHIVE_PROCESS);
export const processSuccess = (processedArticles, blogId) => action(ARCHIVE_PROCESS_SUCCESS, { blogId, processedArticles });
export const processFailure = (error, blogId) => action(ARCHIVE_PROCESS_FAILURE, { blogId, error });