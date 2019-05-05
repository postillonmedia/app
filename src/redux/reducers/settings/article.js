/**
 * Created by DanielL on 07.06.2017.
 */

import { Config } from '../../../constants';

// import action constants
import {
    SETTINGS_ARTICLE_DISPLAY_BACKBUTTON,
    SETTINGS_ARTICLE_FONTSIZE,
    SETTINGS_ARTICLE_TUTORIAL
} from '../../actions/settings/article';

// initial state
const initialState = {
    displayBackButton: Config.article.displayBackButton,
    fontSize: Config.article.fontsize.default,
    tutorial: true,
};

// export reducer
export default function (state = initialState, action) {
    switch (action.type) {

        case SETTINGS_ARTICLE_FONTSIZE: {
            return Object.assign({}, state, {
                fontSize: action.fontSize,
            });
        }

        case SETTINGS_ARTICLE_TUTORIAL: {
            return Object.assign({}, state, {
                tutorial: action.tutorial,
            });
        }

        case SETTINGS_ARTICLE_DISPLAY_BACKBUTTON: {
            return Object.assign({}, state, {
                displayBackButton: action.displayBackButton,
            });
        }

        default:
            return state;
    }
}
