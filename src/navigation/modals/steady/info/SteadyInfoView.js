import React, { PureComponent } from 'react';
import ReactNative, { View, Text, TouchableOpacity, ScrollView } from 'react-native';

import Feather from 'react-native-vector-icons/Feather';


export class SteadyInfoView extends PureComponent {

    constructor(props, context) {
        super(props, context);
    }


    handleLogoutPress = () => {
        const { stateManager, logout } = this.props;

        stateManager.close();
        logout();
    };

    handleCancelPress = () => {
        const { stateManager } = this.props;

        stateManager.close();
    };

    renderSubscription = () => {
        const { styles, t, user, subscription } = this.props;

        if (subscription) {
            const costs = subscription.mothlyAmountInCents / 100;

            return (
                <View>
                    <View style={styles.detail}>
                        <Text style={styles.text}>{t('state')}:</Text>
                        <Text style={styles.text} numberOfLines={1}>{subscription.state}</Text>
                    </View>
                    <View style={styles.detail}>
                        <Text style={styles.text}>{t('plan')}:</Text>
                        <Text style={styles.text} numberOfLines={4}>{subscription.planName}</Text>
                    </View>
                    <View style={styles.detail}>
                        <Text style={styles.text}>{t('costs')}:</Text>
                        <Text style={styles.text} numberOfLines={1}>{t('costsPerMonth', [costs])}</Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.detail}>
                    <Text style={styles.text}>{t('notSubscribed')}</Text>
                </View>
            );
        }

    };

    render() {
        const { styles, t, user } = this.props;

        return (
            <View style={styles.container}>
                <ScrollView style={styles.content}>
                    <Text style={[styles.text, styles.heading]}>{t('heading')}</Text>

                    <Text style={[styles.text, styles.section]}>{t('user')}</Text>
                    <View style={styles.detail}>
                        <Text style={styles.text}>{t('name')}:</Text>
                        <Text style={styles.text} numberOfLines={1}>{user.firstName} {user.lastName}</Text>
                    </View>
                    <View style={styles.detail}>
                        <Text style={styles.text}>{t('email')}:</Text>
                        <Text style={styles.text} numberOfLines={1}>{user.email}</Text>
                    </View>

                    <Text style={[styles.text, styles.section]}>{t('subscription')}</Text>
                    {this.renderSubscription()}
                </ScrollView>

                <View style={styles.buttons}>

                    <TouchableOpacity onPress={this.handleCancelPress} style={styles.button}>
                        <Text style={styles.buttonText}>{t('btnClose')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.handleLogoutPress} style={[styles.button, styles.buttonEmphasized]}>
                        <Feather style={styles.buttonIconPrimary} name={'log-out'} /><Text style={styles.buttonTextPrimary}>{t('btnLogout')}</Text>
                    </TouchableOpacity>

                </View>


            </View>
        );
    }

}

export default SteadyInfoView;
