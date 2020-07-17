import React, { PureComponent } from 'react';
import ReactNative, { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import Feather from 'react-native-vector-icons/Feather';


export class RemoveFromArchiveView extends PureComponent {

    constructor(props, context) {
        super(props, context);
    }

    handleRemoveArticlePress = () => {
        const { stateManager, id, onRemoveArticleFromArchivePress, removeArticleFromArchive } = this.props;

        if (typeof onRemoveArticleFromArchivePress === 'function') {
            onRemoveArticleFromArchivePress();
        } else {
            removeArticleFromArchive(id);
        }

        stateManager.close();
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
                        <Text style={styles.buttonText}>{t('btnCancel')}</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={this.handleRemoveArticlePress} style={[styles.button, styles.buttonEmphasized]}>
                        <Feather style={styles.buttonIconPrimary} name={'trash-2'} /><Text style={styles.buttonTextPrimary}>{t('btnDeleteArticle')}</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }

}

export default RemoveFromArchiveView;