import React from 'react';
import ReactNative, { ActivityIndicator, View } from 'react-native';

import { DomUtils } from 'htmlparser2/lib';

import WebView from '@postillon/react-native-webview';


import Text from '../../text';

import { OtherMediaContainer } from '../../../../mediacontainer';
import OtherOfflineIndicator from '../../../../offlineIndicator/other';


export default function (props = {}, context) {

    const { htmlAttribs, children, parentWrapper, parentTag, baseUrl, keyProperty, data, styles, constants, theme, locale, t, dom, ...otherProps } = props;

    let src = htmlAttribs && htmlAttribs.src;
    const playbuzzDiv = DomUtils.findOne((elem) => elem && elem.attribs && elem.attribs.class && elem.attribs.class.indexOf('pb_feed') >= 0, dom);
    const divHtml = playbuzzDiv && DomUtils.getOuterHTML(playbuzzDiv);

    if (src.startsWith('http') === false) {
        src = 'https:' + src;
    }

    if (playbuzzDiv && divHtml) {
        const html = '<html><head><title>PlayBuzz-Wrapper</title></head><body>' + divHtml + '<script type="text/javascript" src="' + src + '"></script></body></html>';

        return (
            <OtherMediaContainer
                renderOfflineComponent={() => <OtherOfflineIndicator />}
            >
                <WebView
                    key={keyProperty}
                    style={[styles.iframe]}
                    source={{ html, baseUrl }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    mixedContentMode={'compatibility'}
                    thirdPartyCookiesEnabled={true}
                    allowsInlineMediaPlayback={true}
                    startInLoadingState={false}
                    renderLoading={() => (<ActivityIndicator color={constants.colors.activityIndicator} size={'large'} animating={true} />)}
                    defaultHeight={200}
                />
            </OtherMediaContainer>
        );
    } else {
        return (
            <Text>PlayBuzz konnte nicht geladen werden</Text>
        );
    }

};