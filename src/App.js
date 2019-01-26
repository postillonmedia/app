import { Platform } from 'react-native';

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
import { Navigation } from '@postillon/react-native-navigation';
import { iconsMap, isIconsMapLoaded } from './app-icons';
import { registerNavigationComponents } from './navigation';

// deeplinks
import { CustomTabs } from 'react-native-custom-tabs';
import { DeepLinkManager } from './utils/notifications';
import { getBlogByHostname } from './constants/blogs';
import parse from 'url-parse';

// firebase
import Config from './constants/config';
import Firebase from './utils/firebase';



export class App {

    initialized: Promise<boolean>;
    started: Promise<boolean>;

    deepLinkManager: DeepLinkManager;

    _resolveStarted;

    constructor() {
        // create promises
        this.initialized = Promise.all([
            isPersistorBootstrapped,
            isIconsMapLoaded,
        ]);

        this.started = new Promise((resolve, reject) => {
            this._resolveStarted = resolve;
        });


        // add Theme-Constants
        ThemeManager.addConstants(DefaultTheme, Themes.DEFAULT);
        ThemeManager.addConstants(DarkTheme, Themes.DARK);


        // register App-Screens
        registerNavigationComponents(store, AppStateProvider);


        // notification manager
        this.deepLinkManager = new DeepLinkManager();
        this.registerDeepLinkSchemas();


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

                    Navigation.handleDeepLink({
                        link: 'postillon/notification/article',
                        payload: {
                            title,
                            url,
                            parsedUrl: parsed,
                            hostname,
                            path,
                            blogId,
                        },
                    });
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
                    style,
                    getLocalizedString,
                };
            })
            .then(({style, getLocalizedString}) => ({
                tabs: [
                    {
                        label: getLocalizedString('articlesList'),
                        screen: 'postillon.Articles',
                        icon: iconsMap['home'],
                        title: getLocalizedString('articlesList', 'appTitle'),
                    },
                    {
                        label: getLocalizedString('categoriesList'),
                        screen: 'postillon.Categories',
                        icon: iconsMap['grid'],
                        title: getLocalizedString('categoriesList'),
                    },
                    {
                        label: getLocalizedString('archive'),
                        screen: 'postillon.Archive',
                        icon: iconsMap['bookmark'],
                        title: getLocalizedString('archive'),
                    },
                    {
                        label: getLocalizedString('more'),
                        screen: 'postillon.More',
                        icon: iconsMap['more-horizontal'],
                        title: getLocalizedString('more'),
                    },
                ],
                portraitOnlyMode: true,
                animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
                tabsStyle: {
                    ...style,
                },
                appStyle: {
                    ...style,
                },
            }))
            .then((config) => Navigation.startTabBasedApp(config))
            .then(() => this._resolveStarted && this._resolveStarted(true))
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
                const parsed = parse(url);

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
                if (path === '/') {
                    // currently nothing to do.
                    // But we can use the hostname to determinate the startup language of the app.
                } else if (path[0] === '/' && path[1] === 'p' && path[2] === '/') {
                    // app was started with a link to a static page of blogger
                    const { theme } = getAppSettings(store.getState());

                    const constants = ThemeManager.getConstantsForTheme(theme);

                    CustomTabs.openURL(url, constants.styles.customTabs);
                } else {
                    // app was started with a link to an article
                    Navigation.handleDeepLink({
                        link: 'postillon/article',
                        payload: {
                            url,
                            parsedUrl,
                            hostname,
                            path,
                            blogId,
                        },
                    });
                }
            })
        }
    };
}


export default App;