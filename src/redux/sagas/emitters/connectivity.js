import { eventChannel } from 'redux-saga';

import { NetInfo } from 'react-native';


export const connectivityChangeEmitter = () => {
    return eventChannel(emitter => {
        const onConnectivityChanged = (connectionInfo) => {
            emitter(connectionInfo);
        };

        NetInfo.addEventListener('connectionChange', onConnectivityChanged);

        return () => {
            NetInfo.removeEventListener('connectionChange', onConnectivityChanged);
        }
    });
};

export default connectivityChangeEmitter;