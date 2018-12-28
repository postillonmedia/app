export const getWindowEnvironment = state => state.environment.window;
export const getWindowWidth = state => state.environment.window.width;
export const getWindowHeight = state => state.environment.window.height;
export const getScreenEnvironment = state => state.environment.screen;
export const getNetworkEnvironment = state => state.environment.network;
export const getIsConnected = state => state.environment.network.isConnected;


export default {
    getWindowEnvironment,
    getWindowWidth,
    getWindowHeight,
    getScreenEnvironment,
    getNetworkEnvironment,
    getIsConnected,
}