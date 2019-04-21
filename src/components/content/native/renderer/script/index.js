import React from 'react';
import ReactNative from 'react-native';

import external from './external';
import internal from './internal';


const renderer = function (props = {}) {

    const { htmlAttribs, children, parentWrapper, onLinkPress, keyProperty, data, styles, constants, theme, locale, t, ...otherProps } = props;

    const src = htmlAttribs && htmlAttribs.src;

    if (src) {
        // external script
        return external(props);

    } else {
        // internal script
        return internal(props);

    }

};

renderer.wrapper = 'View';

export default renderer;
