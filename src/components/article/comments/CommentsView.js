import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ReactNative, { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import { Navigation } from '@postillon/react-native-navigation';

import FeatherIcon from 'react-native-vector-icons/Feather';
import parse from 'url-parse';

import OtherMediaContainer from '../../mediacontainer/other';
import OtherOfflineIndicator from '../../offlineIndicator/other';
import { getBlogByHostname } from '../../../constants/blogs';

import AutoHeightWebView from 'react-native-autoheight-webview';
import { CustomTabs } from 'react-native-custom-tabs';


export class CommentsView extends PureComponent {

    static propTypes = {
        articleState: PropTypes.object.isRequired,
        width: PropTypes.number,
        displayCommentsAlways: PropTypes.bool,
    };

    static defaultProps = {
        width: 0,
        displayCommentsAlways: false,
    };

    constructor(props) {
        super(props);

        const { displayCommentsAlways } = props;

        this.state = {
            displayComments: displayCommentsAlways || false,
        }
    }

    handleLoadCommentsPressed = event => {
        this.setState({
            displayComments: true,
        });
    };

    handleShouldStartLoadWithRequest = request => {
        const { constants } = this.props;

        const parsedUrl = parse(request.url);

        const hostname = parsedUrl.hostname;
        const path = parsedUrl.pathname;

        const blogId = getBlogByHostname(hostname || '');

        if (blogId && path.length > 0) {
            if (hostname && blogId && path && path !== '/' && !(path[0] === '/' && path[1] === 'p' && path[2] === '/')) {
                // an article of the Postillon was pressed

                Navigation.handleDeepLink({
                    link: 'postillon/article',
                    payload: {
                        url: request.url,
                        parsedUrl,
                        hostname,
                        path,
                        blogId,
                    },
                });

            } else {
                CustomTabs.openURL(request.url, constants.styles.customTabs);
            }

            return false;
        } else if (hostname === 'disqus.com') {
            if (path.startsWith('/by/') || path.startsWith('/home/')) {
                CustomTabs.openURL(request.url, constants.styles.customTabs);

                return false;
            } else {
                return true;
            }
        } else if (hostname.endsWith('facebook.com') && (path.startsWith('/dialog/oauth') || path.startsWith('/login'))) {
            return true;
        } else if (hostname.endsWith('accounts.google.com') && path.includes('/oauth')) {
            return true;
        } else if (hostname === 'api.twitter.com' && path.startsWith('/oauth')) {
            return true;
        } else {
            const { constants } = this.props;

            CustomTabs.openURL(request.url, constants.styles.customTabs);

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
                <TouchableOpacity style={styles.commentsLoadButton} onPress={this.handleLoadCommentsPressed}>
                    <FeatherIcon name={'message-square'} size={26} color={constants.colors.monochrome.dark3} style={styles.commentsLoadButtonText} />
                    <Text style={styles.commentsLoadButtonText}>{t('commentsLoad')}</Text>
                    <FeatherIcon name={'message-square'} size={26} color={constants.colors.monochrome.dark3} style={[styles.commentsLoadButtonText, {transform: [{rotateY: '180deg'}]}]} />
                </TouchableOpacity>
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
                <OtherMediaContainer
                    renderOfflineComponent={() => <OtherOfflineIndicator />}
                >
                    <AutoHeightWebView
                        style={[styles.commentsWebView, { width: width - 32 }]}
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
            );
        }

        return (
            <View style={[styles.container, styles.commentsContainer]}>
                <Text style={styles.heading}>{t('comments')}</Text>
                <View style={styles.line} />

                { content }
            </View>
        );
    }
}


export default CommentsView;