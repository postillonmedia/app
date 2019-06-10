import { Alert, Platform } from 'react-native';

// i18n
import { getString } from '@postillon/react-native-i18n/src/helpers';
import dictionary from './resources/i18n/dictionary';

// theming
import { ThemeManager } from '@postillon/react-native-theme';
import { Themes, DefaultTheme, DarkTheme } from './constants/themes';

// redux
import { AppStateProvider } from './redux/provider';
import { store, isPersistorBootstrapped } from './redux/store';
import { getAppSettings } from './redux/selectors/settings';
import { authenticationReceived } from './redux/actions/steady';

// navigation
import { Navigation } from 'react-native-navigation';
import { registerNavigationComponents } from './navigation';

// deeplinks
import { InAppBrowser } from '@matt-block/react-native-in-app-browser';
import { DeepLinkManager } from './utils/notifications';
import { getBlogByHostname } from './constants/blogs';
import parse from 'url-parse';

// firebase
import Config from './constants/config';
import Firebase from './utils/firebase';


import HomeArticleListScreen from "./navigation/screens/list/article/HomeArticleListScreen";


export const Icons = {
    home: require('./resources/images/feather/home.png'),
    grid: require('./resources/images/feather/grid.png'),
    bookmark: require('./resources/images/feather/bookmark.png'),
    more: require('./resources/images/feather/more-horizontal.png'),

    postillon: require('./resources/images/postillon.png'),
    search: require('./resources/images/feather/search.png'),
    close: require('./resources/images/feather/x.png'),
};

export const getLocalizedString = (locale, screen, option = 'title') => getString(dictionary)(locale)(screen)(option);

export const Stacks = {
    articles: 'postillon.stack.articles',
    categories: 'postillon.stack.categories',
    archive: 'postillon.stack.archive',
    more: 'postillon.stack.more',
};

export class App {
    static _instance = null;

    static getInstance() {
        if (App._instance === null) {
            App._instance = new App();
        }

        return App._instance;
    }



    initialized: Promise<boolean>;
    started: Promise<boolean>;

    deepLinkManager: DeepLinkManager;

    _resolveStarted;

    constructor() {
        // create promises
        this.started = new Promise((resolve, reject) => {
            this._resolveStarted = resolve;
        });

        let _resolveIsAppLaunched;
        const isAppLaunched = new Promise((resolve, reject) => {
            _resolveIsAppLaunched = resolve;
        });

        this.initialized = Promise.all([
            isPersistorBootstrapped,
            isAppLaunched,
        ]);


        // add Theme-Constants
        ThemeManager.addConstants(DefaultTheme, Themes.DEFAULT);
        ThemeManager.addConstants(DarkTheme, Themes.DARK);


        // register App-Screens
        registerNavigationComponents(store, AppStateProvider);


        // notification manager
        this.deepLinkManager = new DeepLinkManager();
        this.registerDeepLinkSchemas();

        // check for initial deep link
        this.deepLinkManager.checkForInitialDeepLink();

        
        // add launched listener to app
        Navigation.events().registerAppLaunchedListener(() => {
            _resolveIsAppLaunched(true);
        });


        // fetch remote config
        this.fetchRemoteConfiguration();


        // messaging
        const notifications = Firebase.notifications();


        notifications.onNotification((notification: Notification) => {
            // Process your notification as required
            if (notification && notification.data &&  notification.data.url) {
                const { title } = notification;
                const { url } = notification.data;


                if (url && typeof url === 'string') {
                    const parsed = parse(url);

                    const hostname = parsed.hostname;
                    const path = parsed.pathname;

                    const blogId = getBlogByHostname(hostname || '');

                    // TODO
                    // Navigation.handleDeepLink({
                    //     link: 'postillon/notification/article',
                    //     payload: {
                    //         title,
                    //         url,
                    //         parsedUrl: parsed,
                    //         hostname,
                    //         path,
                    //         blogId,
                    //     },
                    // });
                }
            }
        });
        notifications.onNotificationOpened((notificationOpen: NotificationOpen) => {
            // Get the action triggered by the notification being opened
            const action = notificationOpen.action;
            // Get information about the notification that was opened
            const notification: Notification = notificationOpen.notification;

            if (notification && notification.data &&  notification.data.url) {
                const { url } = notification.data;

                if (url && typeof url === 'string') {
                    const parsed = parse(url);

                    this.onArticleUrlMatched({
                        url,
                        parsedUrl: parsed,
                    });
                }
            }
        });
        notifications.getInitialNotification()
            .then((notificationOpen: NotificationOpen) => {
                if (notificationOpen) {
                    // App was opened by a notification
                    // Get the action triggered by the notification being opened
                    const action = notificationOpen.action;
                    // Get information about the notification that was opened
                    const notification: Notification = notificationOpen.notification;

                    if (notification && notification.data &&  notification.data.url) {
                        const { url } = notification.data;

                        if (url && typeof url === 'string') {
                            const parsed = parse(url);

                            this.onArticleUrlMatched({
                                url,
                                parsedUrl: parsed,
                            });
                        }
                    }
                }
            });

    }

    start() {
        this.initialized
            .then(() => {
                const { locale, theme } = getAppSettings(store.getState());

                const { defaults: style } = ThemeManager.getStyleSheetForComponent('screens', theme);
                const getLocalizedString = (screen, option = 'title') => getString(dictionary)(locale)(screen)(option);

                return {
                    locale,
                    theme,
                    style,
                    getLocalizedString,
                };
            })
            .then(({locale, theme, style, getLocalizedString}) => {
                Navigation.setDefaultOptions({
                    animations: {
                        pop: {
                            enabled: false,
                        },
                        push: {
                            enabled: false,
                        },
                        setRoot: {
                            enabled: false,
                        },
                        showModal: {
                            enabled: false,
                        },
                        dismissModal: {
                            enabled: false,
                        }
                    },

                    bottomTabs: style.bottomTabs,
                });

                return Navigation.setRoot({
                    root: {
                        bottomTabs: {
                            id: 'postillon.BottomTabs',
                            children: [
                                {
                                    stack: {
                                        id: Stacks.articles,
                                        children: [
                                            {
                                                component: {
                                                    name: 'postillon.Articles',
                                                    passProps: {
                                                        theme,
                                                        locale,
                                                    },
                                                    options: HomeArticleListScreen.options({theme, locale}),
                                                }
                                            }
                                        ],
                                        options: {
                                            bottomTabs: style.bottomTabs,

                                            bottomTab: {
                                                ...style.bottomTab,

                                                text: getLocalizedString('articlesList'),
                                                icon: Icons.home,
                                                testID: 'TAB_ARTICLES'
                                            }
                                        }
                                    }
                                },
                                {
                                    stack: {
                                        id: Stacks.categories,
                                        children: [
                                            {
                                                component: {
                                                    name: 'postillon.Categories',
                                                    passProps: {
                                                        theme,
                                                        locale,
                                                    },
                                                }
                                            }
                                        ],
                                        options: {
                                            bottomTabs: style.bottomTabs,

                                            bottomTab: {
                                                ...style.bottomTab,

                                                text: getLocalizedString('categoriesList'),
                                                icon: Icons.grid,
                                                testID: 'TAB_CATEGORIES'
                                            }
                                        }
                                    },
                                },
                                {
                                    stack: {
                                        id: Stacks.archive,
                                        children: [
                                            {
                                                component: {
                                                    name: 'postillon.Archive',
                                                    passProps: {
                                                        theme,
                                                        locale,
                                                    },
                                                }
                                            }
                                        ],
                                        options: {
                                            bottomTabs: style.bottomTabs,

                                            bottomTab: {
                                                ...style.bottomTab,

                                                text: getLocalizedString('archive'),
                                                icon: Icons.bookmark,
                                                testID: 'TAB_ARCHIVE'
                                            }
                                        }
                                    }
                                },
                                {
                                    stack: {
                                        id: Stacks.more,
                                        children: [
                                            {
                                                component: {
                                                    name: 'postillon.More',
                                                    passProps: {
                                                        theme,
                                                        locale,
                                                    },
                                                }
                                            }
                                        ],
                                        options: {
                                            bottomTabs: style.bottomTabs,

                                            bottomTab: {
                                                ...style.bottomTab,

                                                text: getLocalizedString('more'),
                                                icon: Icons.more,
                                                testID: 'TAB_MORE'
                                            }
                                        }
                                    }

                                },
                            ],
                        }
                    }
                });
            })
            .then(() => this._resolveStarted && this._resolveStarted(true))
    }

    fetchRemoteConfiguration() {
        if (Config.DEV) {
            Firebase.config().enableDeveloperMode();
        }

        return Firebase.config().fetch()
            .then(() => {
                return Firebase.config().activateFetched();
            })
            .then(() => Firebase.config().getKeysByPrefix('app_'))
            .then((arr) => Firebase.config().getValues(arr))
            .then((entries) => {
                for (let key in entries) {
                    if (!entries.hasOwnProperty(key)) {
                        continue;
                    }

                    const value = entries[key].val();

                    Config.setConfigByUnderscoreSeparatedKey(key, value);
                }

                console.log('Updated Application-Config by firebase');
            })
            .catch(console.error);
    }

    registerDeepLinkSchemas() {
        this.deepLinkManager.registerSchema('steady',
            {
                origin: 'postillon://steady-auth',
            },
            (event) => {
                // match steady auth request
                store.dispatch(authenticationReceived(event.parsedUrl));
            }
        );

        this.deepLinkManager.registerSchema('article',
            {
                origin: 'postillon://article',
            },
            (event) => {
                // match article link
                const { parsedUrl } = event;

                const url = parsedUrl && parsedUrl.pathname && typeof parsedUrl.pathname === 'string' && parsedUrl.pathname.substring(1);


                url && this.onArticleUrlMatched({
                    ...event,
                    url,
                    parsedUrl: parsed,
                });
            }
        );

        this.deepLinkManager.registerSchema('web',
            {
                protocol: (protocol) => protocol === 'http:' || protocol === 'https:',
            },
            (event) => {
                // match http website
                this.onArticleUrlMatched(event);
            }
        );


        this.deepLinkManager.register();
    }

    onArticleUrlMatched(event) {
        const { url, parsedUrl } = event;

        if (typeof url !== 'string') {
            console.warn('Unknown start url: ', url);
            return;
        }

        const hostname = parsedUrl.hostname;
        const path = parsedUrl.pathname;

        const blogId = getBlogByHostname(hostname || '');

        if (hostname && path && blogId) {
            this.started.then((started) => {
                const { theme, locale } = getAppSettings(store.getState());

                if (path === '/') {
                    // currently nothing to do.
                    // But we can use the hostname to determinate the startup language of the app.
                } else if (path[0] === '/' && path[1] === 'p' && path[2] === '/') {
                    // app was started with a link to a static page of blogger
                    const constants = ThemeManager.getConstantsForTheme(theme);

                    InAppBrowser.open(url, constants.styles.customTabs);
                } else {
                    Navigation.mergeOptions('postillon.BottomTabs', {
                        bottomTabs: {
                            currentTabIndex: 0,
                        }
                    });

                    // app was started with a link to an article
                    Navigation.push(Stacks.articles, {
                        component: {
                            name: 'postillon.article.Single',
                            passProps: {
                                theme,
                                locale,
                                stackId: Stacks.articles,
                                articleId: blogId + path,
                            },
                        }
                    });
                }
            });
        }
    }
}


export default App;