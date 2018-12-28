import { combineReducers } from 'redux';
import {
    ARCHIVE_CONTROL_SET_MONTH,
    ARCHIVE_CONTROL_SET_SELECTOR,
    ARCHIVE_CONTROL_SET_YEAR,
    ARCHIVE_CONTROL_SET_YEAR_AND_SELECT_MONTH,

    ARCHIVE_SET_DB_SOURCE,
    ARCHIVE_RELOAD,
    ARCHIVE_RELOAD_FINISHED, ARCHIVE_REQUEST, ARCHIVE_REQUEST_SUCCESS, ARCHIVE_REQUEST_FAILURE,
} from "../actions/archive";


const date = new Date();

const initialControlState = {
    selector: 'month',
    year: date.getFullYear(),
    month: date.getMonth(),
};

function control(state = initialControlState, action) {
    switch (action.type) {
        case ARCHIVE_CONTROL_SET_SELECTOR: {
            return Object.assign({}, state, {
                selector: action.state,
            });
        }

        case ARCHIVE_CONTROL_SET_MONTH: {
            return Object.assign({}, state, {
                month: action.month,
            });
        }

        case ARCHIVE_CONTROL_SET_YEAR: {
            return Object.assign({}, state, {
                year: action.year,
            });
        }

        case ARCHIVE_CONTROL_SET_YEAR_AND_SELECT_MONTH: {
            return Object.assign({}, state, {
                year: action.year,
                selector: 'month',
            });
        }

        default:
            return state;
    }
}


const initialArchive = {
    isReloading: false,
    isFetching: false,

    nextPageToken: undefined,

    articles: [],
    error: undefined,
};

function content(state = initialArchive, action) {
    switch (action.type) {
        case ARCHIVE_SET_DB_SOURCE: {
            return Object.assign({}, state, {
                articles: action.articles
            });
        }

        case ARCHIVE_RELOAD: {
            return Object.assign({}, state, {
                isReloading: true,
                nextPageToken: undefined,
            });
        }
        case ARCHIVE_RELOAD_FINISHED: {
            return Object.assign({}, state, {
                isReloading: false,
                lastReload: action.timestamp,
            });
        }

        case ARCHIVE_REQUEST: {
            return Object.assign({}, state, {
                isFetching: true,
            });
        }

        case ARCHIVE_REQUEST_SUCCESS: {
            return Object.assign({}, state, {
                isFetching: false,
                etag: action.etag,
                error: undefined,
                nextPageToken: action.nextPageToken,
                lastRequest: action.timestamp,
            });
        }

        case ARCHIVE_REQUEST_FAILURE: {
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error,
                lastRequestError: action.timestamp,
            });
        }

        default:
            return state;
    }
}



export default combineReducers({
    content,
    control,
})