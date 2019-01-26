/* global __DEV__ */

export default {
    // Build Configuration - eg. Debug or Release?
    DEV: __DEV__ || false,

    debounce: {
        navigation: 500,
    },

    // API keys
    keys: {
        admob: {
            app: 'ca-app-pub-7093365481881392~4863961535',

            banner: 'ca-app-pub-7093365481881392/6641200015',
            interstitial: 'ca-app-pub-7093365481881392/9269989518',
        },
    },

    // Steady
    steady: {
        client_id: 'c6f38cd2-fd6e-4389-97a3-84a3c7e2f172',
        redirect_uri: 'postillon://steady-auth',
    },

    notifications: {
        topics: {
            automatic: 'automatic-news',
        },
    },

    // Firebase RemoteConfig defaults
    cacheTime: 2592000000, // 2592000000 = 1000*60*60*24*30 = 30 days

    itemsPerRequest: {
        pages: 10,
        archive: 25,
        search: 25,
    },

    article: {
        fontsize: {
            min: 8,
            max: 50,
            'default': 13,
        },
        recommendations: 3,
        displayBackButton: true,
    },
};
