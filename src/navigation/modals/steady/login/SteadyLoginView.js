import React, { PureComponent } from 'react';
import ReactNative, { View, Text, TouchableOpacity } from 'react-native';

import Feather from 'react-native-vector-icons/Feather';


export class SteadyLoginView extends PureComponent {

    constructor(props, context) {
        super(props, context);
    }

    handleCreateAccountPress = () => {
        const { stateManager, register } = this.props;

        stateManager.close();
        register();
    };

    handleLoginPress = () => {
        const { stateManager, login } = this.props;

        stateManager.close();
        login();
    };

    handleCancelPress = () => {
        const { stateManager } = this.props;

        stateManager.close();
    };

    render() {
        const { styles, t } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.texts}>
                    <Text style={[styles.text, styles.heading]}>{t('heading')}</Text>
                    <Text style={styles.text}>{t('text')}</Text>
                </View>
                
                <View style={styles.buttons}>
                    
                    <TouchableOpacity onPress={this.handleCancelPress} style={styles.button}>
                        <Text style={styles.buttonText}>{t('btnNotInterested')}</Text>
                    </TouchableOpacity>
                    
                   <TouchableOpacity onPress={this.handleLoginPress} style={styles.button}>
                        <Feather style={styles.buttonIconSecondary} name={'log-in'} /><Text style={styles.buttonTextSecondary}>{t('btnLoginAccount')}</Text>
                    </TouchableOpacity>
                   
                    <TouchableOpacity onPress={this.handleCreateAccountPress} style={[styles.button, styles.buttonEmphasized]}>
                        <Feather style={styles.buttonIconPrimary} name={'user-plus'} /><Text style={styles.buttonTextPrimary}>{t('btnCreateAccount')}</Text>
                    </TouchableOpacity>
                    
                </View>

                
            </View>
        );
    }

}

export default SteadyLoginView;