export const getSteadyAuthenticationState = state => state.steady.state;
export const getSteadyRefreshToken = state => state.steady.refresh_token;
export const getSteadyAccessToken = state => state.steady.access_token;
export const getSteadyAccessTokenType = state => state.steady.access_token_type;
export const getSteadyAccessTokenExpirationTimestamp = state => state.steady.access_token_expiration_timestamp;
export const getSteadyUser = state => state.steady.user;
export const getSteadySubscription = state => state.steady.subscription;
export const getSteadyError = state => state.steady.error;
export const isSubscribedToSteady = state => !!state.steady.subscription;


export default {
    getSteadyAuthenticationState,
    getSteadyRefreshToken,
    getSteadyAccessToken,
    getSteadyAccessTokenType,
    getSteadyAccessTokenExpirationTimestamp,
    getSteadyUser,
    getSteadySubscription,
    getSteadyError,
    isSubscribedToSteady,
}