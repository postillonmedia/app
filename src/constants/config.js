/* global __DEV__ */

import { Platform } from 'react-native';

class ConfigContainer {
    // Build Configuration - eg. Debug or Release?
    DEV = __DEV__ || false;

    debounce = {
        navigation: 500,
    };

    // API keys
    keys = {
        admob: Platform.select({
            ios: {
                app: 'ca-app-pub-7093365481881392~6097326648',

                banner: 'ca-app-pub-7093365481881392/7536910132',
                interstitial: 'ca-app-pub-7093365481881392/7536910132',
            },
            android: {
                app: 'ca-app-pub-7093365481881392~4863961535',

                banner: 'ca-app-pub-7093365481881392/6641200015',
                interstitial: 'ca-app-pub-7093365481881392/9269989518',
            },
        }),
    };

    // Steady
    steady = {
        client_id: 'c6f38cd2-fd6e-4389-97a3-84a3c7e2f172',
        redirect_uri: 'postillon://steady-auth',
    };

    notifications = {
        topics: {
            automatic: 'automatic-news-de',
        },
    };

    // Firebase RemoteConfig defaults
    cacheTime = 2592000000; // 2592000000 = 1000*60*60*24*30 = 30 days

    itemsPerRequest = {
        pages: 10,
        archive: 25,
        search: 25,
    };

    article = {
        fontsize: {
            min: 8,
            max: 50,
            'default': 13,
        },
        recommendations: 3,
        displayBackButton: true,
    };

    listing = {
        displayArticleIntroduction: true,
    };

    ad = {
        interstitial: {
            enabled: true,
            offset: 2,
            repeat: 3,
        },
    };

    webview = {
        hardwareAccelerated: true,
    };

    setConfigByUnderscoreSeparatedKey(key, value) {
        const path = key.split('_');

        let part = this;
        let i = 1;

        while (i < path.length - 1) {
            const partKey = path[i];

            if (typeof part === 'object') {
                part = part[partKey];
            }

            i++;
        }

        const lastKeySequence = path[path.length - 1];


        if (i > 1 && part && lastKeySequence) {
            part[lastKeySequence] = value;
        }
    }
}

export const Config = new ConfigContainer();

export default Config;
