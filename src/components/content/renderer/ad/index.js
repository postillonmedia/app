import React from 'react';
import ReactNative, { View } from 'react-native';

import { CustomTabs } from 'react-native-custom-tabs';

import Text from './../text';


export default {
    renderer: (props = {}) => {
        const { htmlAttribs, children, parentWrapper, keyProperty, data, styles, constants, ...otherProps } = props;

        return (
            <Text {...props} style={{color: '#ff0000', fontSize: 20}} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} key={keyProperty}>
                !WERBUNG!
            </Text>
        );
    },

    wrapper: 'View',
}