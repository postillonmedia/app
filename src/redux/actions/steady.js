import { action } from './';


export const STEADY_REGISTER = 'STEADY_REGISTER';
export const STEADY_LOGOUT = 'STEADY_LOGOUT';
export const STEADY_LOGIN = 'STEADY_LOGIN';

export const STEADY_AUTHENTICATION_SET_STATE = 'STEADY_AUTHENTICATION_SET_STATE';
export const STEADY_AUTHENTICATION_RECEIVED = 'STEADY_AUTHENTICATION_RECEIVED';

export const STEADY_AUTHENTICATE = 'STEADY_AUTHENTICATE';
export const STEADY_AUTHENTICATE_SUCCESS = 'STEADY_AUTHENTICATE_SUCCESS';
export const STEADY_AUTHENTICATE_FAILED = 'STEADY_AUTHENTICATE_FAILED';

export const STEADY_SUBSCRIPTIONS_REQUEST = 'STEADY_SUBSCRIPTIONS_REQUEST';
export const STEADY_SUBSCRIPTIONS_REQUEST_SUCCESS = 'STEADY_SUBSCRIPTIONS_REQUEST_SUCCESS';
export const STEADY_SUBSCRIPTIONS_REQUEST_FAILED = 'STEADY_SUBSCRIPTIONS_REQUEST_FAILED';


export const register = () => action(STEADY_REGISTER);
export const logout = () => action(STEADY_LOGOUT);
export const login = () => action(STEADY_LOGIN);

export const authenticationSetState = (state) => action(STEADY_AUTHENTICATION_SET_STATE, {state});
export const authenticationReceived = (parsedUrl) => action(STEADY_AUTHENTICATION_RECEIVED, {parsedUrl});

export const authenticate = (accessCode) => action(STEADY_AUTHENTICATE, { code: accessCode });
export const authenticateSuccess = (accessToken, accessTokenType, accessTokenExpirationTimestamp, refreshToken, id, firstName, lastName, email) => action(STEADY_AUTHENTICATE_SUCCESS, { accessToken, accessTokenType, accessTokenExpirationTimestamp, refreshToken, id, firstName, lastName, email });
export const authenticateFailed = (error) => action(STEADY_AUTHENTICATE_FAILED, { error });

export const requestSubscriptions = () => action(STEADY_SUBSCRIPTIONS_REQUEST);
export const requestSubscriptionsSuccess = (subscription) => action(STEADY_SUBSCRIPTIONS_REQUEST_SUCCESS, { subscription });
export const requestSubscriptionsFailed = (error) => action(STEADY_SUBSCRIPTIONS_REQUEST_FAILED, { error });