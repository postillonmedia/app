import React, { PureComponent } from 'react';
import ReactNative, { Text, View } from 'react-native';

import FlexImage from 'react-native-flex-image';
import LinearGradient from 'react-native-linear-gradient';

import Thumbnail from '../../thumbnail/index';


const NotFoundImage = require('../../../resources/images/imageNotFound.png');


export class ImageOfflineIndicatorView extends PureComponent {

    render() {
        const { styles, constants, t, source, style } = this.props;

        if (source && source.uri) {
            return (
                <View style={styles.container}>
                    <Thumbnail source={source} />

                    <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.6)']} style={styles.offlineGradient}>
                        <Text style={styles.offlineText}>{t('image')}</Text>
                    </LinearGradient>
                </View>
            );
        } else {
            const containerStyle = [styles.container];
            const imageStyle = [styles.offlineRessourceImage];

            if (style) {
                containerStyle.push(style);
                imageStyle.push(style);
            }

            return (
                <View style={containerStyle}>
                    <FlexImage style={imageStyle} source={NotFoundImage} />
                    <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.6)']} style={styles.offlineGradient}>
                        <Text style={styles.offlineText}>{t('image')}</Text>
                    </LinearGradient>
                </View>
            );
        }
    }

}


export default ImageOfflineIndicatorView;