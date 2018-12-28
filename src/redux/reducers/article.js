// import action constants
import {
    ARTICLE_PROCESS, ARTICLE_PROCESS_FAILURE, ARTICLE_REQUEST, ARTICLE_REQUEST_FAILURE,

    ARTICLE_ARCHIVE_ADDED,
    ARTICLE_ARCHIVE_REMOVED,

    ARTICLE_SET,
    ARTICLE_ARCHIVE_SET_STATE,
} from '../actions/article';

import Article from './../../realm/schemas/article';


const initialArticle = {
    isLoading: false,
    isFetching: false,

    isArchivating: false,
    isArchived: false,

    articleId: undefined,
    article: undefined,

    error: undefined,
};

const initialArticleById = {};


function article(state = initialArticle, action) {
    switch (action.type) {

        case ARTICLE_REQUEST: {
            return Object.assign({}, state, {
                isLoading: true,
                isFetching: true,

                articleId: action.id,
            });
        }

        case ARTICLE_PROCESS: {
            return Object.assign({}, state, {
                isLoading: true,
                isFetching: false,
            });
        }

        case ARTICLE_REQUEST_FAILURE:
        case ARTICLE_PROCESS_FAILURE: {
            return Object.assign({}, state, {
                isLoading: false,
                isFetching: false,

                error: action.error,
            });
        }

        case ARTICLE_ARCHIVE_SET_STATE: {
            return Object.assign({}, state, {
                isArchivating: action.state,
            });
        }

        case ARTICLE_ARCHIVE_ADDED: {
            return Object.assign({}, state, {
                isArchived: true,
            });
        }
        case ARTICLE_ARCHIVE_REMOVED: {
            return Object.assign({}, state, {
                isArchived: false,
            });
        }

        case ARTICLE_SET: {
            return Object.assign({}, state, {
                isLoading: false,
                isFetching: false,

                isArchived: Article.isArchivated(action.article),

                articleId: action.id,
                article: action.article,

                // reset error
                error: undefined,
            });
        }

        default: {
            return state;
        }
    }
}

function articleById(state = initialArticleById, action) {
    switch (action.type) {
        case ARTICLE_REQUEST:
        case ARTICLE_PROCESS:

        case ARTICLE_REQUEST_FAILURE:
        case ARTICLE_PROCESS_FAILURE:

        case ARTICLE_ARCHIVE_ADDED:
        case ARTICLE_ARCHIVE_REMOVED:

        case ARTICLE_ARCHIVE_SET_STATE:

        case ARTICLE_SET: {
            const { id } = action;

            return Object.assign({}, state, {
                [id]: article(state[id], action),
            });
        }

        default: {
            return state;
        }
    }
}


export default articleById;