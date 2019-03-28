import React from 'react';
import ReactNative, { ActivityIndicator } from 'react-native';

// import WebView from '@postillon/react-native-webview';
import { WebView } from "react-native-webview";

import { OtherMediaContainer } from '../../../../mediacontainer';
import OtherOfflineIndicator from '../../../../offlineIndicator/other';


export default function (props = {}) {

    const { htmlAttribs, children, parentWrapper, onLinkPress, baseUrl, keyProperty, data, styles, constants, theme, locale, t, ...otherProps } = props;
    const src = htmlAttribs && htmlAttribs.src;

    const html = '<html><head><title>Polldady-Wrapper</title></head><body><script type="application/javascript" src="' + src + '"></script></body></html>';

    return (
        <OtherMediaContainer
            renderOfflineComponent={() => <OtherOfflineIndicator />}
        >
            <WebView
                key={keyProperty}
                style={styles.iframe}
                source={{ html, baseUrl }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                mixedContentMode={'compatibility'}
                thirdPartyCookiesEnabled={true}
                startInLoadingState={true}
                renderLoading={() => (<ActivityIndicator color={constants.colors.activityIndicator} size={'large'} animating={true} />)}
                defaultHeight={200}
            />
        </OtherMediaContainer>
    );

};