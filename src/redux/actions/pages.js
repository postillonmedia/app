/**
 * Created by DanielL on 07.06.2017.
 */

// const category = {
//     selector: '*',
//     blog: '312132422424',
//     id: `312132422424_*`,
//
//     articles: 'Artikel Source sorted&filtered',
//     nextPageToken: '',
//     page: 1,
//     articlesPerPage: 10,
//
//     isReloading: false,
//     isLoading: false, // remainingRequests > 0
//     isFetching: false,
//
//     remainingRequests: 5,
// }

import { action } from './index';


export const PAGE_INITIALIZE = 'PAGE_INITIALIZE';

export const PAGE_SET_DB_SOURCE = 'PAGE_SET_DB_SOURCE';

export const PAGE_RELOAD = 'PAGE_RELOAD';
export const PAGE_RELOAD_FINISHED = 'PAGE_RELOAD_FINISHED';

export const PAGE_END_REACHED = 'PAGE_END_REACHED';

export const PAGE_PAGINATE = 'PAGE_PAGINATE';
export const PAGE_PAGINATE_NETWORK = 'PAGE_PAGINATE_NETWORK';
export const PAGE_PAGINATE_NETWORK_BEGINN = 'PAGE_PAGINATE_NETWORK_BEGINN';
export const PAGE_PAGINATE_NETWORK_END = 'PAGE_PAGINATE_NETWORK_END';

export const PAGE_REQUEST = 'PAGE_REQUEST';
export const PAGE_REQUEST_CANCEL = 'PAGE_REQUEST_CANCEL';
export const PAGE_REQUEST_SUCCESS = 'PAGE_REQUEST_SUCCESS';
export const PAGE_REQUEST_FAILURE = 'PAGE_REQUEST_FAILURE';

export const PAGE_PROCESS_ARTICLES = 'PAGE_PROCESS_ARTICLES';
export const PAGE_PROCESS_ARTICLES_SUCCESS = 'PAGE_PROCESS_ARTICLES_SUCCESS';
export const PAGE_PROCESS_ARTICLES_FAILURE = 'PAGE_PROCESS_ARTICLES_FAILURE';


export const initialize = (blogId, category = null) => action(PAGE_INITIALIZE, {blogId, category});

export const setDbSource = (articles, blogId, category = null) => action(PAGE_SET_DB_SOURCE, {blogId, category, articles});

export const reload = (blogId, category = null) => action(PAGE_RELOAD, {blogId, category});
export const reloadFinished = (blogId, category = null) => action(PAGE_RELOAD_FINISHED, {blogId, category});

export const endReached = (blogId, category = null) => action(PAGE_END_REACHED, {blogId, category});
export const paginate = (nextPage, blogId, category = null) => action(PAGE_PAGINATE, {blogId, category, nextPage});
export const paginateNetwork = (blogId, category = null) => action(PAGE_PAGINATE_NETWORK, {blogId, category});
export const paginateNetworkBegin = (blogId, category = null) => action(PAGE_PAGINATE_NETWORK_BEGINN, {blogId, category});
export const paginateNetworkEnd = (blogId, category = null) => action(PAGE_PAGINATE_NETWORK_END, {blogId, category});

export const request = (blogId, category = null) => action(PAGE_REQUEST, {blogId, category});
export const requestCancel = (blogId, category = null) => action(PAGE_REQUEST_CANCEL, {blogId, category});
export const requestSuccess = (articles, nextPageToken, etag, blogId, category = null) => action(PAGE_REQUEST_SUCCESS, {blogId, category, articles, nextPageToken, etag});
export const requestFailure = (error, blogId, category) => action(PAGE_REQUEST_FAILURE, {blogId, category, error});

export const process = (blogId, category = null) => action(PAGE_PROCESS_ARTICLES, {blogId, category});
export const processSuccess = (processedArticles, blogId, category = null) => action(PAGE_PROCESS_ARTICLES_SUCCESS, {blogId, category, processedArticles});
export const processFailure = (error, blogId, category = null) => action(PAGE_PROCESS_ARTICLES_FAILURE, {blogId, category, error});