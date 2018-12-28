import React, { PureComponent } from 'react';
import ReactNative, { Text, View } from 'react-native';
import PropTypes from 'prop-types';


export class OtherOfflineIndicatorView extends PureComponent {

    static propTypes = {
        text: PropTypes.string,
        style: PropTypes.object,

        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]),

        styles: PropTypes.object.isRequired,
        constants: PropTypes.object.isRequired,
        locale: PropTypes.string.isRequired,
        t: PropTypes.func.isRequired,
    };

    render() {
        const { styles, constants, t, style, text = t('other') } = this.props;

        return (
            <View style={[style, styles.container]}>
                <View style={styles.divider}></View>
                <Text style={styles.text}>{text}</Text>
                <View style={styles.divider}></View>
            </View>
        );
    }

}


export default OtherOfflineIndicatorView;