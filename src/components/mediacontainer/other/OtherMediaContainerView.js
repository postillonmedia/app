/**
 * Created by DanielL on 16.06.2017.
 */

import React, { Children, PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactNative, { Animated, View, TouchableOpacity, TouchableWithoutFeedback, Share } from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import Text from './../../text';


export class OtherMediaContainerView extends PureComponent {

    static displayName = 'OtherMediaContainer';
    static componentName = 'OtherMediaContainer';

    static propTypes = {
        isConnected: PropTypes.bool.isRequired,
        locale: PropTypes.string.isRequired,
        t: PropTypes.func.isRequired,
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]),
        renderOfflineComponent: PropTypes.func,
    };

    constructor(props, context) {
        super(props, context);
    }

    renderOffline = () => {
        return null;
    };

    render() {
        const { children, isConnected, renderOfflineComponent } = this.props;

        const renderOffline = renderOfflineComponent || this.renderOffline;

        if (isConnected) {
            return Children.only(children);
        } else {
            return renderOffline();
        }
    }
}

export default OtherMediaContainerView;