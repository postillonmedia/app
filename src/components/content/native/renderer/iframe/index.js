import React from 'react';
import ReactNative, { ActivityIndicator } from 'react-native';

import AutoHeightWebView from 'react-native-autoheight-webview';

import OtherMediaContainer from '../../../../mediacontainer/other';
import OtherOfflineIndicator from '../../../../offlineIndicator/other';
import {CustomTabs} from "react-native-custom-tabs";


export default function (props = {}) {

    const { htmlAttribs, children, parentWrapper, onLinkPress, keyProperty, data, styles, constants, theme, locale, t, width, ...otherProps } = props;
    const uri = htmlAttribs.src;

    if (!uri) {
        return false;
    }


    const handleShouldStartLoadWithRequest = request => {
        CustomTabs.openURL(request.url, constants.styles.customTabs);

        return false;
    };

    return (
        <OtherMediaContainer key={keyProperty}
            renderOfflineComponent={() => <OtherOfflineIndicator />}
        >
            <AutoHeightWebView
                key={keyProperty + '-webview'}
                style={[styles.iframe, { width: width - 32, height: 200}]}
                mediaPlaybackRequiresUserAction={false}
                baseUrl={uri}
                source={{ uri, baseUrl: uri }}
                useWebKit={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                originWhitelist={['*']}
                mixedContentMode={'always'}
                thirdPartyCookiesEnabled={true}
                allowsInlineMediaPlayback={true}
                startInLoadingState={true}
                renderLoading={() => (<ActivityIndicator color={constants.colors.activityIndicator} size={'large'} animating={true} />)}
                onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
                customStyle={`
                  html, body {
                    min-height: 200px;
                  }
                  #player {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                  }
                `}
            />
        </OtherMediaContainer>
    );

};
