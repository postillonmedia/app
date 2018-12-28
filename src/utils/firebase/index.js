import firebase from 'react-native-firebase';

import Events from './events';

import { Config } from '../../constants';


// configure AdMob
firebase.admob().initialize(Config.keys.admob.app);

firebase.iid().get().then((id) => {
    console.log('Instance ID: ', id);
});

firebase.messaging().getToken().then((token) => {
    console.log('Token: ', token);
});


// configure RemoteConfig
// if (Config.DEV) {
//     firebase.config().enableDeveloperMode();
// }

// firebase.config().setDefaults(Config.defaults);
// firebase.config().fetch()
//     .then(() => {
//         return firebase.config().activateFetched();
//     });
//
// export const RemoteConfig = firebase.config();

export const events = Events;

export default firebase;