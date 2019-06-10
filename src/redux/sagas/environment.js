import NetInfo from "@react-native-community/netinfo";
import { Navigation } from 'react-native-navigation';

import { all, take, put, call, select } from 'redux-saga/effects';

import { connectedChangeEmitter } from './emitters/connected';
import { connectivityChangeEmitter } from './emitters/connectivity';
import { dimensionChangeEmitter } from './emitters/dimensions';

import { dimensionChange, networkConnectedChange, networkConnectivityChange, navigationConstantsChange } from './../actions/environment';
import { getScreenEnvironment, getWindowEnvironment } from '../selectors/environment';


/******************************************************************************/
/******************************* HANDLERS *************************************/
/******************************************************************************/

function* initializeConnectivity() {
    try {
        const { type,  effectiveType } = yield call([NetInfo, NetInfo.getConnectionInfo]);
        yield put(networkConnectivityChange(type, effectiveType));
    } catch (e) {
        console.error(e);
    }
}

function* initializeConnected() {
    try {
        const isConnected = yield call([NetInfo.isConnected, NetInfo.isConnected.fetch]);
        yield put(networkConnectedChange(isConnected));
    } catch (e) {
        console.error(e);
    }
}

function* initializeNavigationConstants() {
    try {
        const constants = yield call([Navigation, Navigation.constants]);
        yield put(navigationConstantsChange(constants));
    } catch (e) {
        console.error(e);
    }
}


/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

function checkForDimensionChange(newState, state) {
    const { width, height, scale, fontScale } = newState;

    return state.width !== width || state.height !== height || state.scale !== scale || state.fontScale !== fontScale;
}

function* watchOnDimensions() {
    const dimensionChangeChannel = yield call(dimensionChangeEmitter);

    while (true) {
        const { window,  screen } = yield take(dimensionChangeChannel);

        const windowState = yield select(getWindowEnvironment);
        const screenState = yield select(getScreenEnvironment);

        if (checkForDimensionChange(window, windowState) || checkForDimensionChange(screen, screenState)) {
            yield put(dimensionChange(window, screen));
        }
    }
}

function* watchOnNetworkConnectivity() {
    const networkConnectivityChangeChannel = yield call(connectivityChangeEmitter);

    while (true) {
        const { type,  effectiveType } = yield take(networkConnectivityChangeChannel);

        yield put(networkConnectivityChange(type, effectiveType));
    }
}

function* watchOnNetworkConnected() {
    const networkConnectedChangeChannel = yield call(connectedChangeEmitter);

    while (true) {
        const isConnected = yield take(networkConnectedChangeChannel);

        yield put(networkConnectedChange(isConnected));
    }
}



export default function* environmentSaga() {
    yield all([
        watchOnDimensions(),
        watchOnNetworkConnected(),
        watchOnNetworkConnectivity(),

        // execute once
        initializeConnected(),
        initializeConnectivity(),
        initializeNavigationConstants(),
    ]);
}