import React from 'react';
import ReactNative, { View } from 'react-native';


export default function (props) {
    const { htlmAttribs, children, styles, keyProperty } = props;

    return (
        <View style={styles.hr} key={keyProperty} />
    );
}