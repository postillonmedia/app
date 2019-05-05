/**
 * Created by DanielL on 18.06.2017.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactNative, {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Navigation } from '@postillon/react-native-navigation';

import { CustomTabs } from 'react-native-custom-tabs';

import AutoHeightWebView from 'react-native-autoheight-webview';
import parse from 'url-parse';

import { getBlogByHostname } from '../../../constants/blogs';


export class ContentView extends PureComponent {

    static displayName = 'NativeContent';
    static componentName = 'NativeContent';

    static propTypes = {
        html: PropTypes.string.isRequired,
        baseUrl: PropTypes.string.isRequired,

        emSize: PropTypes.number.isRequired,
        baseFontSize: PropTypes.number.isRequired,
        textSelectable: PropTypes.bool,

        width: PropTypes.number.isRequired,

        imagesToExclude: PropTypes.arrayOf(PropTypes.string),
        renderAd: PropTypes.func,

        t: PropTypes.func.isRequired,

        theme: PropTypes.string.isRequired,
        styles: PropTypes.object.isRequired,
        constants: PropTypes.object.isRequired,
    };

    static defaultProps = {
        emSize: 14,
        baseFontSize: 14,
        textSelectable: false,

        width: undefined,

        imagesToExclude: [],
        renderAd: () => null,
    };

    constructor(props, context, updater) {
        super(props, context, updater);
    }

    handleShouldStartLoadWithRequest = (request) => {
        const { baseUrl } = this.props;

        const parsedBaseUrl = parse(baseUrl);
        const parsedUrl = parse(request.url);

        const hostname = parsedUrl.hostname;
        const path = parsedUrl.pathname;

        const blogId = getBlogByHostname(hostname || '');

        if (blogId && path === parsedBaseUrl.pathname) {
            // a link to the current displayed article has been clicked: do nothing
            return false;

        } else if (blogId && path !== parsedBaseUrl.pathname) {
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
                const { constants } = this.props;

                CustomTabs.openURL(request.url, constants.styles.customTabs);
            }

            return false;
        } else {
            const { constants } = this.props;

            CustomTabs.openURL(request.url, constants.styles.customTabs);

            return false;
        }
    };



    render() {
        const { html: body, baseUrl, t, styles, constants, imagesToExclude, baseFontSize, width } = this.props;

        const html = '<!DOCTYPE html><html lang="de"><head><title>Fallback Display</title></head><body style="width: 100%;">' + body + '</body></html>';

        return (
            <View style={styles.container} key={'contentcontainer-webview'}>
                <AutoHeightWebView
                    originWhitelist={['*']}
                    mixedContentMode={'always'}
                    baseUrl={baseUrl}
                    style={[styles.iframe, { width: width - 32}]}
                    source={{ html }}
                    renderLoading={() => (<ActivityIndicator color={constants.colors.activityIndicator} size={'large'} animating={true} />)}
                    useWebKit={true}
                    cacheEnabled={false}
                    startInLoadingState={true}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    mediaPlaybackRequiresUserAction={false}
                    customStyle={`
                      html, body {
                        width: 100%;
                        height: 100%;
                      }
                      * {
                        font-family: 'PTSerif-Regular, Times New Roman';
                        font-size: ${baseFontSize}px;
                        color: ${constants.colors.text.primary};
                      }
                      div.separator:first-of-type {
                        display: none;
                      }
                      
                      iframe {
                        border: 0;
                        background-color: ${constants.colors.monochrome.white4};
                      }
                    `}
                    onShouldStartLoadWithRequest={this.handleShouldStartLoadWithRequest}

                    bounces={false}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    overScrollMode={'never'}

                    automaticallyAdjustContentInsets={false}
                />

                <LinearGradient colors={constants.colors.gradient.highlighted} style={{ padding: 8, borderRadius: 5 }}>
                    <Text style={[constants.styles.text.ui, { color: constants.colors.text.negative, textAlign: 'center' }]}>{t('webviewRendering')}</Text>
                </LinearGradient>
            </View>
        );
    }

}

export default ContentView;