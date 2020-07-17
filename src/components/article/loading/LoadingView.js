import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ReactNative, {ActivityIndicator, Text, View} from 'react-native';


export class ControlsView extends PureComponent {

    render() {
        const { styles, constants, t } = this.props;

        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator animating={true} size={'large'} color={constants.colors.activityIndicator} />
                <Text style={styles.text}>{t('loading')}</Text>
            </View>
        );
    }

}


export default ControlsView;