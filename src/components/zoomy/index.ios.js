import React, { Children, PureComponent } from 'react';
import { requireNativeComponent } from 'react-native';

// const ZoomyView = requireNativeComponent('ZoomyView');

export const Zoomy = ({ children }) => {
    // return <ZoomyView style={{ height: 100, flex: 1 }} />;

    return Children.only(children);
};
