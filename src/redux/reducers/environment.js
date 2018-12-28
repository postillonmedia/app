// import action constants
import {
    ENVIRONMENT_DIMENSIONS_CHANGE,
    ENVIRONMENT_NETWORK_CONNECTED_CHANGE, ENVIRONMENT_NETWORK_CONNECTIVITY_CHANGE
} from './../actions/environment';

import { Dimensions, PixelRatio } from 'react-native';


// initial state
const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

const initialState = {
    window: {
        height: window.height,
        width: window.width,
        scale: window.scale,
        fontScale: window.fontScale,
    },
    screen: {
        height: screen.height,
        width: screen.width,
        scale: screen.scale,
        fontScale: screen.fontScale,
    },
    pixel:{
        ratio: PixelRatio.get(),
        fontScale: PixelRatio.getFontScale(),
    },
    network: {
        isConnected: null,
        connectionType: null,
        connectionEffectiveType: null,
    }
};

// export reducer
export default function (state = initialState, action) {
    switch (action.type) {

        case ENVIRONMENT_DIMENSIONS_CHANGE: {
            return Object.assign({}, state, {
                window: action.window,
                screen: action.screen
            });
        }

        case ENVIRONMENT_NETWORK_CONNECTED_CHANGE: {
            return Object.assign({}, state, {
                network: {
                    ...state.network,
                    isConnected: action.isConnected,
                }
            });
        }

        case ENVIRONMENT_NETWORK_CONNECTIVITY_CHANGE: {
            return Object.assign({}, state, {
                network: {
                    ...state.network,
                    connectionType: action.connectionType,
                    connectionEffectiveType: action.effectiveType,
                }
            });
        }

        default:
            return state;
    }
}