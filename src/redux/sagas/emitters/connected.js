import { eventChannel } from 'redux-saga';

import NetInfo from "@react-native-community/netinfo";


export const connectedChangeEmitter = () => {
    return eventChannel(emitter => {
        const onConnectedChanged = (isConnected) => {
            emitter(isConnected);
        };

        NetInfo.isConnected.addEventListener('connectionChange', onConnectedChanged);

        return () => {
            NetInfo.isConnected.removeEventListener('connectionChange', onConnectedChanged);
        }
    });
};

export default connectedChangeEmitter;