import React from 'react';
import ReactNative, { Alert, Text } from 'react-native';

import TextWrapper from '../textwrapper'

const ArticleText = function (props = {}) {

    const { htmlAttribs, children, parentWrapper, keyProperty, data, style, styles, constants, theme, baseFontSize, ...otherProps } = props;

    if (typeof children === 'string') {

        const textStyle = [style, styles && styles.text, {
            fontSize: baseFontSize,
        }, style];

        return (
            <Text {...otherProps} key={keyProperty} style={textStyle}>
                { children || data }
            </Text>
        );

    } else if (children) {

        const textStyle = [style, styles && styles.text, style];

        return (
            <Text {...otherProps} key={keyProperty} style={textStyle}>
                { children || data }
            </Text>
        );

    } else {

        return null;

    }

};


const InternalText = function (props = {}) {

    const { htmlAttribs, children, rawChildren, parentWrapper, parentTag, baseUrl, keyProperty, data, styles, constants, theme, locale, t, dom, style, baseFontSize, ...otherProps } = props;

    props.test && Alert.alert('Test: true');

    // props.test && Alert.alert('Style', JSON.stringify(style));
    // props.test && Alert.alert('Children', JSON.stringify(children));

    if (typeof children === 'string') {

        const textStyle = [style, styles && styles.text, {
            fontSize: baseFontSize,
        }, style];

        return (
            <Text {...otherProps} key={keyProperty} style={textStyle}>
                { children || data }
            </Text>
        );

    } else if (children) {

        const textStyle = [style];

        !parentWrapper && styles && textStyle.push(styles.text);

        return (
            <InternalText>
                { children || data }
            </InternalText>
        );

    } else {

        return null;

    }

};

export default ArticleText;