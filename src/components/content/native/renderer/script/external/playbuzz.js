import React from 'react';
import ReactNative, { ActivityIndicator } from 'react-native';

import { DomUtils } from 'htmlparser2';

import AutoHeightWebView from 'react-native-autoheight-webview';
import { InAppBrowser } from '@matt-block/react-native-in-app-browser';

import { Config } from '../../../../../../constants';

import { OtherMediaContainer } from '../../../../../mediacontainer';
import OtherOfflineIndicator from '../../../../../offlineIndicator/other';


export default function (props = {}, context) {

    const { htmlAttribs, children, parentWrapper, parentTag, baseUrl, keyProperty, data, styles, constants, theme, locale, t, dom, width, ...otherProps } = props;

    let src = htmlAttribs && htmlAttribs.src;
    const playbuzzDiv = DomUtils.findOne((elem) => elem && elem.attribs && elem.attribs.class && elem.attribs.class.indexOf('pb_feed') >= 0, dom);
    const divHtml = playbuzzDiv && DomUtils.getOuterHTML(playbuzzDiv);

    if (src.startsWith('http') === false) {
        src = 'https:' + src;
    }

    if (playbuzzDiv && divHtml) {
        const html = '<!DOCTYPE html><html lang="de"><head><title>PlayBuzz-Wrapper</title></head><body>' + divHtml + '<script type="text/javascript" src="' + src + '"></script></body></html>';

        const handleShouldStartLoadWithRequest = request => {
            InAppBrowser.open(request.url, constants.styles.customTabs);

            return false;
        };

        return (
            <OtherMediaContainer
                key={keyProperty}
                renderOfflineComponent={() => <OtherOfflineIndicator />}
            >
                <AutoHeightWebView
                    style={[styles.iframe, { width: width - 32, backgroundColor: constants.colors.monochrome.white4 }]}
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
                    allowsInlineMediaPlayback={true}
                    startInLoadingState={true}
                    renderLoading={() => (<ActivityIndicator color={constants.colors.activityIndicator} size={'large'} animating={true} />)}
                    onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
                />
            </OtherMediaContainer>
        );
    } else {
        throw new Error('PlayBuzz konnte nicht geladen werden');
    }

};