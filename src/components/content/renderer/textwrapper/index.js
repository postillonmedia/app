import React from 'react';
import ReactNative, { Text } from 'react-native';


export default function (props = {}) {
    const { children, styles, baseFontSize } = props;

    const textStyle = [ styles && styles.textwrapper, {
        fontSize: baseFontSize,
    }];

    return (
        <Text style={textStyle}>{ children }</Text>
    );
}