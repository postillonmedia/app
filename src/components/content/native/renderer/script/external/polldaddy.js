import React from 'react';
import ReactNative, { ActivityIndicator } from 'react-native';

import AutoHeightWebView from 'react-native-autoheight-webview/autoHeightWebView';
import { CustomTabs } from 'react-native-custom-tabs';

import { OtherMediaContainer } from '../../../../../mediacontainer';
import OtherOfflineIndicator from '../../../../../offlineIndicator/other';


export default function (props = {}) {

    const { htmlAttribs, children, parentWrapper, onLinkPress, baseUrl, keyProperty, data, styles, constants, theme, locale, t, width, ...otherProps } = props;
    const src = htmlAttribs && htmlAttribs.src;

    const html = '<!DOCTYPE html><html lang="de"><head><title>Polldady-Wrapper</title></head><body><script type="application/javascript" src="' + src + '"></script></body></html>';

    const handleShouldStartLoadWithRequest = request => {
        CustomTabs.openURL(request.url, constants.styles.customTabs);

        return false;
    };

    return (
        <OtherMediaContainer
            renderOfflineComponent={() => <OtherOfflineIndicator />}
        >
            <AutoHeightWebView
                key={keyProperty}
                style={[styles.iframe, { width: width - 32, backgroundColor: constants.colors.monochrome.white4}]}
                baseUrl={baseUrl}
                source={{ html, baseUrl }}
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