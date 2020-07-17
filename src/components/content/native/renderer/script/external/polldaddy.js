import React from 'react';
import ReactNative, { ActivityIndicator } from 'react-native';

import AutoHeightWebView from 'react-native-autoheight-webview';
import { InAppBrowser } from '../../../../../../utils/util';

import { Config } from '../../../../../../constants';

import { OtherMediaContainer } from '../../../../../mediacontainer';
import OtherOfflineIndicator from '../../../../../offlineIndicator/other';


export default function (props = {}) {

    const { htmlAttribs, children, parentWrapper, onLinkPress, baseUrl, keyProperty, data, styles, constants, theme, locale, t, width, ...otherProps } = props;
    const src = htmlAttribs && htmlAttribs.src;

    const html = '<!DOCTYPE html><html lang="de"><head><title>Polldady-Wrapper</title></head><body><script type="application/javascript" src="' + src + '"></script></body></html>';

    const handleShouldStartLoadWithRequest = request => {
        if (request.url.indexOf('platform.twitter.com/widgets/') >= 0 || request.url.indexOf('facebook.com/plugins/') >= 0) {
            // if the requests contains an url to the Facebook or Twitter button allow the loading
            return true;
        } else if (request.url !== baseUrl) {
            // if the url is not the article, open the url in the in-app-browser
            InAppBrowser.open(request.url);
        }

        return false;
    };

    return (
        <OtherMediaContainer
            key={keyProperty}
            renderOfflineComponent={() => <OtherOfflineIndicator />}
        >
            <AutoHeightWebView
                style={[styles.iframe, { width: width - 32, backgroundColor: constants.colors.monochrome.white4}]}
                androidHardwareAccelerationDisabled={!Config.webview.hardwareAccelerated}
                baseUrl={baseUrl}
                source={{ html, baseUrl }}
                useWebKit={true}
                allowsFullscreenVideo={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                originWhitelist={['*']}
                mixedContentMode={'always'}
                thirdPartyCookiesEnabled={true}
                startInLoadingState={true}
                renderLoading={() => (<ActivityIndicator color={constants.colors.activityIndicator} size={'large'} animating={true} />)}
                onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
            />
        </OtherMediaContainer>
    );

};
