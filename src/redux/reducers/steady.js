import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

// import action constants
import {
    STEADY_LOGOUT,
    STEADY_AUTHENTICATION_SET_STATE,
    STEADY_AUTHENTICATE_SUCCESS,
    STEADY_SUBSCRIPTIONS_REQUEST_SUCCESS, STEADY_AUTHENTICATE_FAILED, STEADY_SUBSCRIPTIONS_REQUEST_FAILED
} from '../actions/steady';



const steadyPersistorConfig = {
    key: 'steady',
    storage: AsyncStorage,
    blacklist: ['error'],
};


const initialSteadyState = {
    state: undefined,

    access_token: undefined,
    access_token_type: undefined,
    access_token_expiration_timestamp: undefined,
    refresh_token: undefined,

    user: null,
    subscription: null,
    error: null,
};


function steady(state = initialSteadyState, action) {
    switch (action.type) {
        case STEADY_LOGOUT: {
            return Object.assign({}, initialSteadyState);
        }

        case STEADY_AUTHENTICATION_SET_STATE: {
            return Object.assign({}, state, {
                state: action.state,
            });
        }

        case STEADY_AUTHENTICATE_SUCCESS: {
            return Object.assign({}, state, {
                access_token: action.accessToken,
                access_token_type: action.accessTokenType,
                access_token_expiration_timestamp: action.accessTokenExpirationTimestamp,

                refresh_token: action.refreshToken,

                user: {
                    id: action.id,
                    email: action.email,
                    firstName: action.firstName,
                    lastName: action.lastName,
                }
            });
        }

        case STEADY_SUBSCRIPTIONS_REQUEST_SUCCESS: {
            return Object.assign({}, state, {
                subscription: action.subscription,
            });
        }

        case STEADY_AUTHENTICATE_FAILED:
        case STEADY_SUBSCRIPTIONS_REQUEST_FAILED: {
            return Object.assign({}, state, {
                error: action.error,
            });
        }

        default: {
            return state;
        }
    }
}


export default persistReducer(steadyPersistorConfig, steady);
