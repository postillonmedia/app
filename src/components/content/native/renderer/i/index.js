import React from 'react';
import ReactNative from 'react-native';

import Text from '../text';


export default function (props = {}) {

    const { htmlAttribs, children, parentWrapper, onLinkPress, keyProperty, data, styles, constants, theme, locale, t, ...otherProps } = props;

    return (
        <Text {...props} style={styles.i} key={keyProperty}>
            { children || data }
        </Text>
    );
};