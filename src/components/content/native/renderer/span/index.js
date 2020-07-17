import React from 'react';
import Text from '../text';

export default function (props = {}) {

    const { htmlAttribs, children, parentWrapper, keyProperty, data, style, styles, constants, theme, baseFontSize, ...otherProps } = props;

    if (htmlAttribs.style && htmlAttribs.style.match(/font-size\s*:\s*x-small/g)) {

        return (
            // TODO: find a better style for the credits of the article
            <Text key={keyProperty} style={{fontStyle: 'italic', fontWeight: '200', letterSpacing: -1}} baseFontSize={5}>
                {'\n\n'}
                {children}
            </Text>
        );

    } else {

        return children;

    }

};
