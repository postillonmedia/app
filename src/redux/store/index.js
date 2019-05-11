/**
 * Created by DanielL on 07.06.2017.
 */

import {
    applyMiddleware,
    compose,
    createStore,
} from 'redux';

import Config from '../../constants/config';

// middleware
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import crashReport from '../../utils/crashreport';

// enhancers
import {
    persistCombineReducers,
    persistStore,
} from 'redux-persist';

// initial state
import initialState from './initialState';

// combined reducers
import combinedReducers from '../reducers';

// combined sagas
import combinedSagas from '../sagas';


// build middleware
const sagaMiddleware = createSagaMiddleware();

let middlewares = [
    crashReport,
    sagaMiddleware,
];

if (Config.DEV) {
    middlewares = [
        ...middlewares,
        // createLogger(),
    ];
}

// build additional enhancers
let enhancers = [];

// compose enhancers
const composedEnhancers = compose(
    applyMiddleware(...middlewares),
    ...enhancers
);

// build store
export const store = createStore(
    combinedReducers,
    initialState,
    composedEnhancers
);


// export promise which resolves when the persistor has bootstrapped the config
let _isPersistorBootstrappedResolve;
export const isPersistorBootstrapped = new Promise((resolve, reject) => {
    _isPersistorBootstrappedResolve = resolve;
});


// launch sagas
sagaMiddleware.run(combinedSagas);


// initialize redux-persist
export const persistor = persistStore(store, {
    debug: __DEV__,
}, () => {
    const { bootstrapped } = persistor.getState();

    if (bootstrapped === true && _isPersistorBootstrappedResolve) {
        _isPersistorBootstrappedResolve();
    }
});

// export store
export default store;