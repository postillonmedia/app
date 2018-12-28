// import action constants
import {
    PAGE_SET_DB_SOURCE,
    PAGE_PAGINATE, PAGE_PAGINATE_NETWORK_BEGINN, PAGE_PAGINATE_NETWORK_END, PAGE_PROCESS_ARTICLES_SUCCESS, PAGE_RELOAD,
    PAGE_RELOAD_FINISHED, PAGE_REQUEST, PAGE_REQUEST_FAILURE, PAGE_REQUEST_SUCCESS
} from './../actions/pages';
import {PAGE_PROCESS_ARTICLES_FAILURE} from "../actions/pages";


const initialPageState = {
    isReloading: false,
    isLoading: false,
    isFetching: false,

    pageNumber: 1,
    nextPageToken: undefined,

    articles: [],
};

const initialPagesByBlogAndCategory = {};


function page(state = initialPageState, action) {
    switch (action.type) {

        case PAGE_SET_DB_SOURCE: {
            return Object.assign({}, state, {
                articles: action.articles
            });
        }

        case PAGE_RELOAD: {
            return Object.assign({}, state, {
                isReloading: true,
                pageNumber: 1,
                nextPageToken: undefined,
            });
        }
        case PAGE_RELOAD_FINISHED: {
            return Object.assign({}, state, {
                isReloading: false,
                lastReload: action.timestamp,
            });
        }

        case PAGE_PAGINATE: {
            return Object.assign({}, state, {
                pageNumber: action.nextPage,
                lastPaginate: action.timestamp,
            });
        }
        case PAGE_PAGINATE_NETWORK_BEGINN: {
            return Object.assign({}, state, {
                isLoading: true,
            });
        }
        case PAGE_PAGINATE_NETWORK_END: {
            return Object.assign({}, state, {
                isLoading: false,
                lastNetworkPaginate: action.timestamp,
            });
        }

        case PAGE_REQUEST: {
            return Object.assign({}, state, {
                isFetching: true,
            });
        }
        case PAGE_REQUEST_SUCCESS: {
            return Object.assign({}, state, {
                isFetching: false,
                etag: action.etag,
                error: undefined,
                nextPageToken: action.nextPageToken,
                lastRequest: action.timestamp,
            });
        }
        case PAGE_REQUEST_FAILURE: {
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error,
                lastRequestError: action.timestamp,
            });
        }

        case PAGE_PROCESS_ARTICLES_SUCCESS:
        case PAGE_PROCESS_ARTICLES_FAILURE: {
            return Object.assign({}, state, {
                error: action.error,
                lastArticleProcessing: action.timestamp,
            });
        }

        default: {
            return state;
        }
    }
}

function pagesByBlogAndCategory(state = initialPagesByBlogAndCategory, action) {
    switch (action.type) {

        case PAGE_SET_DB_SOURCE:

        case PAGE_RELOAD:
        case PAGE_RELOAD_FINISHED:

        case PAGE_PAGINATE:
        case PAGE_PAGINATE_NETWORK_BEGINN:
        case PAGE_PAGINATE_NETWORK_END:

        case PAGE_REQUEST:
        case PAGE_REQUEST_SUCCESS:
        case PAGE_REQUEST_FAILURE:

        case PAGE_PROCESS_ARTICLES_SUCCESS:
        case PAGE_PROCESS_ARTICLES_FAILURE: {
            const { blogId, category } = action;

            const selector = !category ? blogId : blogId + '_' + category;

            return Object.assign({}, state, {
                [selector]: page(state[selector], action),
            });
        }

        default: {
            return state;
        }
    }
}


export default pagesByBlogAndCategory;