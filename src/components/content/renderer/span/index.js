import React from 'react';
import ReactNative, {  } from 'react-native';

import Text from '../text';

const getCircularReplacer = () => {
    const seen = new Set;
    return (key, value) => {
        if (key == 'parent' || key == 'styles' || key == 'html' || key == 'constants' || key == 'renderers' ||key == 'rawChildren' || key == 'children') return;

        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
};

export default function (props = {}) {

    const { htmlAttribs, children, parentWrapper, keyProperty, data, style, styles, constants, theme, baseFontSize, ...otherProps } = props;

    // TODO: find fix
    // return children;

    if (htmlAttribs.style && htmlAttribs.style.match(/font-size\s*:\s*x-small/g)) {

        return (
            <Text key={keyProperty} style={{fontStyle: 'italic', fontWeight: '200', letterSpacing: -1}} baseFontSize={5}>
                {'\n\n'}
                {children}
            </Text>
        );

    } else {

        return children;

    }

};