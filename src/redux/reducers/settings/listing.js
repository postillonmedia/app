/**
 * Created by DanielL on 07.06.2017.
 */

import { Config } from '../../../constants';

// import action constants
import { SETTINGS_LISTING_DISPLAY_ARTICLE_INTRODUCTION } from '../../actions/settings/listing';

// initial state
const initialState = {
    displayArticleIntroduction: Config.listing.displayArticleIntroduction,
};

// export reducer
export default function (state = initialState, action) {
    switch (action.type) {

        case SETTINGS_LISTING_DISPLAY_ARTICLE_INTRODUCTION: {
            return Object.assign({}, state, {
                displayArticleIntroduction: action.displayArticleIntroduction,
            });
        }

        default:
            return state;
    }
}
