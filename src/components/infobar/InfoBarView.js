import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactNative, {View, Text, TouchableOpacity, Alert} from 'react-native';


export class InfoBarView extends PureComponent {

    static displayName = 'InfoBar';
    static componentName = 'InfoBar';

    static propTypes = {
        error: PropTypes.object,
        isConnected: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        error: null,
    };

    constructor() {
        super(...arguments);
    }

    handleErrorMoreInfoPress = () => {
        const { error, t } = this.props;

        Alert.alert(t('errorAdvanced'), error.message + '\n\nStacktrace:\n' + JSON.stringify(error.stack));
    };

    render() {
        const { isConnected, error, style, styles, t } = this.props;

        const content = [];

        if (!isConnected) {
            const notConnectedView = (
                <View key={'info.offline'} style={styles.informationNotConnected}>
                    <Text style={styles.informationNotConnectedText}>{t('noConnection')}</Text>
                </View>
            );

            content[content.length] = notConnectedView;
        } else if (error) {
            const errorView = (
                <View key={'info.error'} style={styles.informationError}>
                    <Text style={styles.informationErrorText}>{t('error')}</Text>
                    <TouchableOpacity onPress={this.handleErrorMoreInfoPress}>
                        <Text style={styles.informationErrorBtn}>{t('errorMoreInfo')}</Text>
                    </TouchableOpacity>
                </View>
            );

            content[content.length] = errorView;
        }


        // render the header if the code above has pushed at least one view in content
        if (content.length > 0) {
            return (
                <View style={[styles.informationIndicator, style]}>
                    {content}
                </View>
            );
        } else {
            return null;
        }
    }

}

export default InfoBarView;