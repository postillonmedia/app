/**
 * Created by DanielL on 29.06.2017.
 */

import ReactNative, { Linking } from 'react-native';


export function onPressHandler() {
    const args = Array.from(arguments);

    if (args.length > 0) {
        const url = args.shift();

        if (url && typeof url === 'function') {
            url();
        } else {
            Linking.canOpenURL(url)
                .then(supported => {
                    if (supported) {
                        return Linking.openURL(url);
                    } else {
                        throw new Error('[onPressHandler] ' + url + ' is a not supported url');
                    }
                })
                .catch(err => {
                    onPressHandler.apply(this, args);
                });
        }
    }
};