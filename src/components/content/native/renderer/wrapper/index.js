import React from 'react';
import ReactNative, { View } from 'react-native';


export default function (props = {}) {
    const { children, styles, keyProperty } = props;

    return (
        <View key={keyProperty}>{ children }</View>
    );
}