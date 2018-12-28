import { action } from './';


export const ENVIRONMENT_DIMENSIONS_CHANGE = 'ENVIRONMENT_DIMENSIONS_CHANGE';
export const ENVIRONMENT_NETWORK_CONNECTED_CHANGE = 'ENVIRONMENT_NETWORK_CONNECTED_CHANGE';
export const ENVIRONMENT_NETWORK_CONNECTIVITY_CHANGE = 'ENVIRONMENT_NETWORK_CONNECTIVITY_CHANGE';

export const dimensionChange = (window, screen) => action(ENVIRONMENT_DIMENSIONS_CHANGE, {window, screen});
export const networkConnectedChange = (isConnected) => action(ENVIRONMENT_NETWORK_CONNECTED_CHANGE, {isConnected});
export const networkConnectivityChange = (connectionType, effectiveType) => action(ENVIRONMENT_NETWORK_CONNECTIVITY_CHANGE, {connectionType, effectiveType});