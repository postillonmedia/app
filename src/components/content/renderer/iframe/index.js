import React from 'react';
import ReactNative, { ActivityIndicator } from 'react-native';

import WebView from '@postillon/react-native-webview';
// import { WebView } from "react-native-webview";

import OtherMediaContainer from '../../../mediacontainer/other';
import OtherOfflineIndicator from '../../../offlineIndicator/other';


export default function (props = {}) {

    const { htmlAttribs, children, parentWrapper, onLinkPress, keyProperty, data, styles, constants, theme, locale, t, ...otherProps } = props;

    if (!htmlAttribs.src) {
        return false;
    }

    return (
        <OtherMediaContainer
            renderOfflineComponent={() => <OtherOfflineIndicator />}
        >
            <WebView
                key={keyProperty}
                useWebKit={true}
                style={styles.iframe}
                source={{ uri: htmlAttribs.src }}
                renderLoading={() => (<ActivityIndicator color={constants.colors.activityIndicator} size={'large'} animating={true} />)}
                startInLoadingState={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                defaultHeight={200}
            />
        </OtherMediaContainer>
    );

};
