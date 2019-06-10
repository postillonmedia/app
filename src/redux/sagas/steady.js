import ReactNative, { Alert, Linking } from 'react-native';
import {all, call, delay, put, putResolve, select, take, takeEvery, takeLatest} from 'redux-saga/effects';

import qs from 'qs';

import { isPersistorBootstrapped } from '../store';
import {
    STEADY_AUTHENTICATE,
    STEADY_AUTHENTICATION_RECEIVED,
    STEADY_LOGIN,
    STEADY_REGISTER,
    STEADY_SUBSCRIPTIONS_REQUEST
} from '../actions/steady';
import * as SteadyActions from '../actions/steady';
import {
    getSteadyAccessToken,
    getSteadyAccessTokenType,
    getSteadyAccessTokenExpirationTimestamp,
    getSteadyAuthenticationState,
    getSteadyRefreshToken
} from '../selectors/steady';
import Config from '../../constants/config';


function* handleLogin(action) {
    // generate random state for unique auth request
    const state = (Math.random().toString(36)+'00000000000000000').slice(2, 18);

    yield putResolve(SteadyActions.authenticationSetState(state));

    try {
        const query = qs.stringify({
            response_type: 'code',
            client_id: Config.steady.client_id,
            redirect_uri: Config.steady.redirect_uri,
            scope: 'read',
            state: state,
        });

        const url = 'https://steadyhq.com/oauth/authorize?' + query;


        const canOpenUrl = yield call([Linking, Linking.canOpenURL], url);

        if (canOpenUrl) {
            yield call([Linking, Linking.openURL], url);
        } else {
            throw new Error('Your device is not capable to open the following link: ' + url);
        }
    } catch (e) {
        Alert.alert('Error', e.message);
    }
}

function* handleRegister(action) {
    const url = 'https://steadyhq.com/de/sign_up';

    try {
        const canOpenUrl = yield call([Linking, Linking.canOpenURL], url);

        if (canOpenUrl) {
            yield call([Linking, Linking.openURL], url);
        } else {
            throw new Error('Your device is not capable to open the following link: ' + url);
        }
    } catch (e) {
        Alert.alert('Error', e.message);
    }
}

function* handleAuthenticationReceived(action) {
    const { parsedUrl } = action;

    try {
        let query = parsedUrl && parsedUrl.query;

        if (!query) {
            throw new Error('Empty result from Steady.');
        } else if (query.startsWith('?')) {
            query = query.substring(1);
        }

        const result = qs.parse(query);

        // request state from store
        const state = yield select(getSteadyAuthenticationState);

        if (result.state !== state) {
            throw new Error('Random state differs:\nState: ' + state + '\nSteady: ' + result.state);
        }

        // reset state
        yield put(SteadyActions.authenticationSetState(undefined));

        // state is the same we can continue
        yield put(SteadyActions.authenticate(result.code));

    } catch (e) {
        Alert.alert('Steady-Error', e.message);
    }
}

function* handleAuthenticate(action) {
    const { code } = action;

    const body = {
        client_id: Config.steady.client_id,
        redirect_uri: Config.steady.redirect_uri,
    };

    try {
        if (code) {
            body['grant_type'] = 'authorization_code';
            body['code'] = code;
        } else {
            // select refresh token
            const refresh_token = yield select(getSteadyRefreshToken);

            if (!refresh_token) {
                return;
            }

            body['grant_type'] = 'refresh_token';
            body['refresh_token'] = refresh_token;
        }

        const url = 'https://steady.der-postillion.de/token';

        const response = yield call(fetch, url, {
            method: 'POST',

            body: JSON.stringify(body),
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }),
        });
        const json = yield call([response, response.json]);

        // calculate expiration timestamp for accesstoken
        const expiresIn = json['expires_in'];

        if (expiresIn && typeof expiresIn === 'number' && expiresIn > 0) {
            const expirationTimestamp = Date.now() + expiresIn * 1000;

            yield putResolve(SteadyActions.authenticateSuccess(json.access_token, json.token_type, expirationTimestamp, json.refresh_token, json.info['id'], json.info['first-name'], json.info['last-name'], json.info['email']));

            yield put(SteadyActions.requestSubscriptions());
        } else {
            throw new Error('ExpiresIn was not the expected value.');
        }

        return true;
    } catch (e) {
        yield put(SteadyActions.authenticateFailed(e));
    }

    return false;
}

function* handleSubscriptionRequest(action) {
    try {
        const url = 'https://steady.der-postillion.de/subscriptions';

        const accessTokenType = 'Bearer'; // yield select(getSteadyAccessTokenType);
        const accessToken = yield select(getSteadyAccessToken);

        const response = yield call(fetch, url, {
            method: 'GET',

            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': accessTokenType + ' ' +  accessToken,
            }),
        });
        const json = yield call([response, response.json]);



        let subscription = null;

        if (json && json.data && json.data.attributes && json.included && json.included.length && json.included.length > 0) {
            subscription = {};

            subscription['state'] = json.data.attributes['state'];
            subscription['period'] = json.data.attributes['period'];

            const plan = json.included[0];

            if (plan && plan.attributes) {
                subscription['currency'] = plan.attributes['currency'];
                subscription['mothlyAmountInCents'] = plan.attributes['monthly-amount-in-cents'];
                subscription['annualAmountInCents'] = plan.attributes['annual-amount-in-cents'];

                subscription['planName'] = plan.attributes['name'];
                subscription['planImage'] = plan.attributes['image-url'];
            }
        }

        yield put(SteadyActions.requestSubscriptionsSuccess(subscription));

        return true;
    } catch (e) {
        yield put(SteadyActions.requestSubscriptionsFailed(e));
    }

    return false;
}


function* checkLogin() {
    try {
        yield isPersistorBootstrapped;

        const accessToken = yield select(getSteadyAccessToken);

        if (accessToken) {
            // user is logged in

            const timestamp = Date.now() + 30000; // add 30 sec tolerance
            const expirationTimestamp = yield select(getSteadyAccessTokenExpirationTimestamp);

            let success = false;
            if (timestamp < expirationTimestamp) {
                success = yield call(handleSubscriptionRequest);
            }

            if (!success || timestamp >= expirationTimestamp) {
                const refreshToken = yield select(getSteadyRefreshToken);

                if (refreshToken) {
                    let i = 0;

                    while (!success && i < 3) {
                        i++;

                        success = yield call(handleAuthenticate);

                        if (!success) {
                            yield delay(30000);
                        }
                    }

                    if (success) {
                        yield put(SteadyActions.requestSubscriptions())
                    }
                }

            }

            if (!success) {
                yield put(SteadyActions.authenticateFailed(new Error('Could not validate your Session. A new Login is required.')));
            }
        }
    } catch (e) {
        console.error(e);
    }
}


function* watchOnLogin() {
    yield takeEvery(STEADY_LOGIN, handleLogin);
}

function* watchOnRegister() {
    yield takeEvery(STEADY_REGISTER, handleRegister);
}

function* watchOnAuthenticationReceived() {
    yield takeEvery(STEADY_AUTHENTICATION_RECEIVED, handleAuthenticationReceived);
}

function* watchOnAuthenticate() {
    yield takeEvery(STEADY_AUTHENTICATE, handleAuthenticate);
}

function* watchOnSubscriptionRequest() {
    yield takeEvery(STEADY_SUBSCRIPTIONS_REQUEST, handleSubscriptionRequest);
}


export default function* steadySaga() {
    yield all([
        watchOnLogin(),
        watchOnRegister(),
        watchOnAuthenticationReceived(),

        watchOnAuthenticate(),

        watchOnSubscriptionRequest(),

        checkLogin(),
    ]);
}