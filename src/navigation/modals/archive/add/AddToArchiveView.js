import React, { PureComponent } from 'react';
import ReactNative, { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import Toast from 'react-native-toast-native';

import Feather from 'react-native-vector-icons/Feather';


export class AddToArchiveView extends PureComponent {

    constructor(props, context) {
        super(props, context);
    }

    handleArticleToArchiveWithPicturesPress = () => {
        const { stateManager, id, addArticleToArchiveWithPictures, isConnected, constants, t } = this.props;

        if (isConnected) {
            addArticleToArchiveWithPictures(id);

            stateManager.close();
        } else {
            Toast.show(t('noConnection'), Toast.SHORT, Toast.CENTER, constants.styles.toast);
        }
    };

    handleArticleToArchiveWithoutPicturesPress = () => {
        const { stateManager, id, addArticleToArchiveWithoutPictures } = this.props;

        addArticleToArchiveWithoutPictures(id);

        stateManager.close();
    };

    render() {
        const { styles, t, isConnected } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.texts}>
                    <Text style={[styles.text, styles.heading]}>{t('heading')}</Text>
                    <Text style={styles.text}>{t('text')}</Text>
                </View>

                <View style={styles.buttons}>
                    
                    <TouchableOpacity onPress={this.handleArticleToArchiveWithoutPicturesPress} style={styles.button}>
                        <Text style={styles.buttonText}>{t('btnDownloadWithoutPictures')}</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={this.handleArticleToArchiveWithPicturesPress} style={[styles.button, isConnected ? styles.buttonEmphasized : styles.buttonDisabled]}>
                        <Feather style={[styles.buttonTextPrimary, styles.buttonIcon]} name={'download'} /><Text style={[styles.buttonText, styles.buttonTextPrimary]}>{t('btnDownloadWithPictures')}</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
        );
    }

}

export default AddToArchiveView;