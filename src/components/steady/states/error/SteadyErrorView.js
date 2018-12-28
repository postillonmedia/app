import React, { PureComponent } from 'react';
import ReactNative, {Alert, Image, Text, TouchableOpacity, View} from 'react-native';

import PropTypes from 'prop-types';

import FeatherIcon from 'react-native-vector-icons/Feather';


export class SteadyErrorView extends PureComponent {

    static propTypes = {
        error: PropTypes.object,
        login: PropTypes.func.isRequired,
        logout: PropTypes.func.isRequired,
    };

    handleSteadyRefreshPress = () => {
        const { login, logout } = this.props;

        logout();
        login();
    };

    handleSteadyInfoPress = () => {
        const { error, t } = this.props;

        Alert.alert(t('errorAdvanced'), error.message + '\n\nStacktrace:\n' + JSON.stringify(error.stack));
    };

    render() {
        const { styles, constants, t } = this.props;

        return (
            <View style={styles.container}>
                <Text style={[styles.text, styles.heading]}><FeatherIcon name={'activity'} size={20} color={constants.colors.text.negative} style={styles.icon} /> {t('error')}</Text>
                <Text style={styles.text}>{t('errorSubheading')}</Text>

                <View style={styles.bar}>
                    <TouchableOpacity onPress={this.handleSteadyRefreshPress} style={styles.button}>
                        <Text style={styles.buttonContent}>{t('retry')} <FeatherIcon name={'refresh-cw'} size={16} /></Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.handleSteadyInfoPress} style={styles.button}>
                        <Text style={styles.buttonContent}>{t('info')} <FeatherIcon name={'info'} size={16} /></Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}


export default SteadyErrorView;