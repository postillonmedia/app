import firebase from 'react-native-firebase';

import Events from './events';

import { Config } from '../../constants';


// configure AdMob
firebase.admob().initialize(Config.keys.admob.app);

if (Config.DEV) {
    firebase.iid().get().then((id) => {
        console.log('Instance ID: ', id);
    });

    firebase.messaging().getToken().then((token) => {
        console.log('Token: ', token);
    });
}

export const events = Events;

export default firebase;