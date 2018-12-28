import React, { PureComponent } from 'react';
import ReactNative, { Image, Linking, Text, TouchableOpacity, View } from 'react-native';

import PropTypes from 'prop-types';

import FeatherIcon from 'react-native-vector-icons/Feather';

import { onPressHandler } from '../../../../utils/util';

import ModalSteadyInfo from '../../../../navigation/modals/steady/info';
import ModalStateContainer from '../../../../components/modalstatecontainer';


export class SteadyLoggedInView extends PureComponent {

    static propTypes = {};

    modalSteadyInfo = undefined;


    refModalSteadyInfo = ref => this.modalSteadyInfo = ref;


    handleSteadySupportPress = e => {
        const url = 'https://steadyhq.com/de/postillon#js_publication_plans';

        onPressHandler(url)
    };

    handleSteadyInfoPress = e => {
        this.modalSteadyInfo && this.modalSteadyInfo.open();
    };


    renderSubscriptionText = () => {
        const { styles, t, subscription } = this.props;

        if (subscription) {
            return (
                <Text style={styles.text} numberOfLines={1} ellipsizeMode={'tail'}>{t('subscribed', [subscription.planName])}</Text>
            );
        } else {
            return (
                <Text style={styles.text} numberOfLines={1} ellipsizeMode={'tail'}>{t('notSubscribed')}</Text>
            );
        }
    };

    renderAmountOfCostsPerMonth = () => {
        const { styles, t, subscription } = this.props;

        if (subscription) {
            const costs =  subscription.mothlyAmountInCents / 100 || 0;

            return (
                <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.text}><FeatherIcon name={'thumbs-up'} /> | {t('costs', [costs])}</Text>
            );
        } else {
            return (
                <TouchableOpacity onPress={this.handleSteadySupportPress} style={styles.button}>
                    <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.buttonContent}>{t('subscribe')} <FeatherIcon name={'log-in'} size={16} /></Text>
                </TouchableOpacity>
            );
        }
    };

    render() {
        const { styles, t, user } = this.props;

        return (
            <View style={styles.container}>
                <Text style={[styles.text, styles.heading]} numberOfLines={1} ellipsizeMode={'tail'}>{t('greeting', [user.firstName])}</Text>
                {this.renderSubscriptionText()}

                <View style={styles.bar}>
                    {this.renderAmountOfCostsPerMonth()}

                    <TouchableOpacity onPress={this.handleSteadyInfoPress} style={styles.button}>
                        <Text style={styles.buttonContent}>{t('info')} <FeatherIcon name={'info'} size={16} /></Text>
                    </TouchableOpacity>
                </View>

                <ModalStateContainer ref={this.refModalSteadyInfo} modal={<ModalSteadyInfo />} key={'modal.steady.info'} />
            </View>
        );
    }

}


export default SteadyLoggedInView;