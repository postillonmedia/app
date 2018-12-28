import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactNative, { Animated, StyleSheet, View } from 'react-native';

import Modal from 'react-native-modal';


export class ModalStateContainerView extends PureComponent {

    static propTypes = {
        modal: PropTypes.element.isRequired,
    };

    static defaultProps = {
        useNativeDriver: true,
    };

    state = {
        visible: false,
    };

    constructor() {
        super(...arguments);

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    open(props = {}) {
        this.setState({
            visible: true,
            props,
        });
    };

    close() {
        this.setState({
            visible: false,
        });
    };

    toggle() {
        const { visible } = this.state;

        this.setState({
            visible: !visible,
        });
    };

    render() {
        const { visible, props = {} } = this.state;
        const {
            modal,
            onBackdropPress = this.close,
            onBackButtonPress = this.close,
            ...modalProps
        } = this.props;

        return (
            <Modal {...modalProps} onBackdropPress={onBackdropPress} onBackButtonPress={onBackButtonPress} isVisible={visible}>
                { React.cloneElement(modal, {
                    ...modalProps,
                    ...props,
                    stateManager: this,
                }) }
            </Modal>
        );
    }

}


export default ModalStateContainerView;