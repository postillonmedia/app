import React, { PureComponent } from 'react';
import ReactNative, { Alert, View, Platform, StyleSheet, Text, ToastAndroid, TouchableOpacity } from 'react-native';

// import Toast from 'react-native-toast-native';

import Feather from 'react-native-vector-icons/Feather';


export class AddToArchiveView extends PureComponent {

    constructor(props, context) {
        super(props, context);
    }

    handleArticleToArchiveWithPicturesPress = () => {
        const { stateManager, id, onAddArticleToArchiveWithPicturesPress, addArticleToArchiveWithPictures, isConnected, constants, t } = this.props;

        if (isConnected) {
            if (typeof onAddArticleToArchiveWithPicturesPress === 'function') {
                onAddArticleToArchiveWithPicturesPress();
            } else {
                addArticleToArchiveWithPictures(id);
            }

            stateManager.close();
        } else {
            if (Platform.OS === 'android') {
                ToastAndroid.showWithGravity(t('noConnection'), ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            } else {
                Alert.alert(null, t('noConnection'));
            }
        }
    };

    handleArticleToArchiveWithoutPicturesPress = () => {
        const { stateManager, id, onAddArticleToArchiveWithoutPicturesPress, addArticleToArchiveWithoutPictures } = this.props;

        if (typeof onAddArticleToArchiveWithoutPicturesPress === 'function') {
            onAddArticleToArchiveWithoutPicturesPress();
        } else {
            addArticleToArchiveWithoutPictures(id);
        }

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
