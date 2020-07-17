import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ReactNative, { Platform, ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { Navigation } from 'react-native-navigation';

import parse from 'url-parse';

import OtherMediaContainer from '../../mediacontainer/other';
import OtherOfflineIndicator from '../../offlineIndicator/other';
import { getBlogByHostname } from '../../../constants/blogs';
import { Config } from '../../../constants';
import { Stacks } from '../../../App';

import { InAppBrowser } from '../../../utils/util';

import AutoHeightWebView from 'react-native-autoheight-webview';


const ABOUT_BLANK = 'about:blank';

export class CommentsView extends PureComponent {

    static propTypes = {
        articleState: PropTypes.object.isRequired,
        width: PropTypes.number,
        displayCommentsAlways: PropTypes.bool,
        setDisplayCommentsAlways: PropTypes.func,
    };

    static defaultProps = {
        width: 0,
        displayCommentsAlways: false,
        setDisplayCommentsAlways: () => null,
    };

    constructor(props) {
        super(props);

        const { displayCommentsAlways } = props;

        this.state = {
            displayComments: displayCommentsAlways || false,
        };
    }

    handleLoadCommentsPressed = event => {
        this.setState({
            displayComments: true,
        });
    };

    handleLoadCommentsAlwaysPressed = event => {
        const { setDisplayCommentsAlways } = this.props;

        // set setting
        setDisplayCommentsAlways(true);

        // show comments
        this.handleLoadCommentsPressed(event);
    };

    handleShouldStartLoadWithRequest = request => {
        const { articleState } = this.props;
        const { article } = articleState;

        const parsedArticleUrl = parse(article.url);
        const parsedUrl = parse(request.url);

        const hostname = parsedUrl.hostname;
        const path = parsedUrl.pathname;

        const blogId = getBlogByHostname(hostname || '');
        const articleBlogId = getBlogByHostname(parsedArticleUrl.hostname || '');

        if (blogId && path.length > 0) {
            if (blogId === articleBlogId && path === parsedArticleUrl.pathname) {
                // The current article was matched.
                // On iOS the loading of this request must be allowed.
                return Platform.OS === 'ios';
            }

            if (hostname && blogId && path && path !== '/' && !(path[0] === '/' && path[1] === 'p' && path[2] === '/')) {
                // an article of the Postillon was pressed

                // TODO: point to the right screen
                // Navigation.handleDeepLink({
                //     link: 'postillon/article',
                //     payload: {
                //         url: request.url,
                //         parsedUrl,
                //         hostname,
                //         path,
                //         blogId,
                //     },
                // });

                // TODO: replace this with a call to Navigation: Need current componentId
                InAppBrowser.open(request.url);
            } else {
                InAppBrowser.open(request.url);
            }

            return false;
        } else if (request.url === ABOUT_BLANK) {
            return true;
        } else if (hostname === 'disqus.com') {
            if (path.startsWith('/by/') || path.startsWith('/home/')) {
                InAppBrowser.open(request.url);

                return false;
            } else {
                return true;
            }
        } else if (hostname.endsWith('facebook.com')) {
            return (path.startsWith('/dialog/oauth') || path.startsWith('/login'));
        } else if (hostname.endsWith('accounts.google.com') && path.includes('/oauth')) {
            return true;
        } else if (hostname === 'api.twitter.com' && path.startsWith('/oauth')) {
            return true;
        } else {
            InAppBrowser.open(request.url);

            return false;
        }
    };

    render() {
        const { displayComments } = this.state;
        const { articleState, width, t, locale, styles, constants } = this.props;
        const { article } = articleState;

        let content = null;

        if (!displayComments) {
            content = (
                <View style={styles.commentsContainer}>
                    <TouchableOpacity style={styles.commentsLoadButton} onPress={this.handleLoadCommentsPressed}>
                        <Text style={styles.commentsLoadButtonText}>{t('commentsLoad')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.commentsLoadAlwaysButton} onPress={this.handleLoadCommentsAlwaysPressed}>
                        <Text style={styles.commentsLoadAlwaysButtonText}>{t('commentsLoadAlways')}</Text>
                    </TouchableOpacity>
                </View>

            );
        } else {
            const html = `
                <html lang="${locale}">
                    <head>
                        <title>Disqus-Wrapper</title>
                    </head>
                    <body>
                        <div id="disqus_thread"></div>
                                           
                        <script type="application/javascript">
                            disqus_config = function () {
                                this.page = this.page || {};
    
                                this.page.url = '${article.url}';
                                this.page.title = '${article.title}';
                            };
    
                            (function() {
                                var d = document, s = d.createElement('script');
    
                                s.src = 'https://postillon.disqus.com/embed.js';
                                s.setAttribute('data-timestamp', +new Date());
    
                                (d.head || d.body).appendChild(s);
                            })();
                        </script>
                    </body>
                </html>
            `;

            content = (
                <View style={styles.commentsWebViewContainer}>
                    <OtherMediaContainer
                        renderOfflineComponent={() => <OtherOfflineIndicator />}
                    >
                        <AutoHeightWebView
                            style={[styles.commentsWebView, { width: width - 32 }]}
                            androidHardwareAccelerationDisabled={!Config.webview.hardwareAccelerated}
                            allowsFullscreenVideo={true}
                            bounces={false}
                            scrollEnabled={false}
                            mediaPlaybackRequiresUserAction={false}
                            baseUrl={article.url}
                            source={{ html, baseUrl: article.url }}
                            useWebKit={true}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            originWhitelist={['*']}
                            mixedContentMode={'always'}
                            thirdPartyCookiesEnabled={true}
                            allowsInlineMediaPlayback={true}
                            sharedCookiesEnabled={true}
                            startInLoadingState={true}
                            renderLoading={() => (<ActivityIndicator color={constants.colors.activityIndicator} size={'large'} animating={true} />)}
                            onShouldStartLoadWithRequest={this.handleShouldStartLoadWithRequest}
                        />
                    </OtherMediaContainer>
                </View>
            );
        }

        return (
            <View style={[styles.container, styles.section]}>
                <Text style={styles.heading}>{t('comments')}</Text>
                <View style={styles.line} />

                { content }
            </View>
        );
    }
}


export default CommentsView;
