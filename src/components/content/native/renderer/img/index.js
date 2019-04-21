import React, { PureComponent } from 'react';
import ReactNative, { ActivityIndicator } from 'react-native';

import FlexImage from 'react-native-flex-image';

import { Zoomy } from '../../../../zoomy/index';
import { ImageContainer } from '../../../../mediacontainer';
import OfflineIndicator from '../../../../offlineIndicator/image';


export default function (props = {}) {
    const { htmlAttribs, children, style, styles, constants, theme, locale, t, imagesToExclude, ...otherProps } = props;
    const { src, alt, width, height } = htmlAttribs;


    if (!htmlAttribs.src) {
        // if image has no src
        return false;
    }

    if (height && height < 25 || width && width < 25) {
        // if image is to small (will also exclude tracking images)
        return false;
    }

    if (imagesToExclude.indexOf(src) >= 0) {
        // if image is excluded from rendering
        return false;
    }

    const imageStyle = [style || (styles && styles.image)];

    const renderImage = (props = {}) => (
        <Zoomy>
            <FlexImage {...props} loadingComponent={<ActivityIndicator color={constants.colors.activityIndicator} animating={true} size="large" />} />
        </Zoomy>
    );

    const renderNotOnline = (props = {}) => (
        <OfflineIndicator {...props} />
    );

    return (
        <ImageContainer
            source={{ uri: src }}
            style={imageStyle}

            ImageComponent={FlexImage}

            renderImageComponent={renderImage}
            renderNotOnlineComponent={renderNotOnline}

            borderRadius={5}
        />
    )

};