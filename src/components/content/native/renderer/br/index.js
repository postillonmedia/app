import React from 'react';
import ReactNative, { Text } from 'react-native';


export default function (props) {
    const { htlmAttribs, children, styles, emSize, keyProperty } = props;

    return (
        <Text style={{ height: 1.2 * emSize, flex: 1 }} key={keyProperty}>{"\n"}</Text>
    );
}