import { action } from './';


export const SEARCH_INITIALIZE = 'SEARCH_INITIALIZE';
export const SEARCH_SET_PERIOD = 'SEARCH_SET_PERIOD';
export const SEARCH_SET_CATEGORY = 'SEARCH_SET_CATEGORY';

export const SEARCH_SUBMIT = 'SEARCH_SUBMIT';
export const SEARCH_END_REACHED = 'SEARCH_END_REACHED';

export const SEARCH_PAGINATE = 'SEARCH_PAGINATE';
export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_REQUEST_SUCCESS = 'SEARCH_REQUEST_SUCCESS';
export const SEARCH_REQUEST_FAILURE = 'SEARCH_REQUEST_FAILURE';



export const initialize = (blogId, category = undefined) => action(SEARCH_INITIALIZE, {blogId, category});
export const setPeriod = (period) => action(SEARCH_SET_PERIOD, {period});
export const setCategory = (category) => action(SEARCH_SET_CATEGORY, {category});

export const submit = (search) => action(SEARCH_SUBMIT, {search});
export const endReached = () => action(SEARCH_END_REACHED, {});

export const request = () => action(SEARCH_REQUEST, {});
export const requestSuccess = (articles) => action(SEARCH_REQUEST_SUCCESS, {articles});
export const requestFailure = (error) => action(SEARCH_REQUEST_FAILURE, {error});



export default {
    initialize,
    setPeriod,
    setCategory,

    submit,
    endReached,

    request,
    requestSuccess,
    requestFailure,
}