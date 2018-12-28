// import action constants
import {
    SEARCH_INITIALIZE,
    SEARCH_SET_PERIOD, SEARCH_SET_CATEGORY,
    SEARCH_SUBMIT
} from './../actions/search';
import {SEARCH_REQUEST, SEARCH_REQUEST_FAILURE, SEARCH_REQUEST_SUCCESS} from "../actions/search";


// initial state
const initialState = {
    isSearching: false,

    blogId: undefined,
    period: undefined,
    category: undefined,
    search: undefined,

    results: [],
};

// export reducer
export default function (state = initialState, action) {
    switch (action.type) {

        case SEARCH_INITIALIZE: {
            return Object.assign({}, state, {
                blogId: action.blogId,
                period: undefined,
                category: action.category,
                search: undefined,

                results: [],
            });
        }

        case SEARCH_SET_PERIOD: {
            return Object.assign({}, state, {
                period: action.period,

                results: [],
            });
        }
        case SEARCH_SET_CATEGORY: {
            return Object.assign({}, state, {
                category: action.category,

                results: [],
            });
        }

        case SEARCH_SUBMIT: {
            return Object.assign({}, state, {
                search: action.search,

                results: [],
            });
        }

        case SEARCH_REQUEST: {
            return Object.assign({}, state, {
                isSearching: true,
            });
        }

        case SEARCH_REQUEST_SUCCESS: {
            const results = action.articles && action.articles.length && action.articles.length > 0 ? state.results.concat(action.articles) : state.results;

            return Object.assign({}, state, {
                isSearching: false,
                results: results,
            });
        }

        case SEARCH_REQUEST_FAILURE: {
            return Object.assign({}, state, {
                isSearching: false,
            });
        }

        default:
            return state;
    }
}