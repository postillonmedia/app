import React, { PureComponent } from 'react';
import ReactNative, { Image, Text, View } from 'react-native';

const postillon = require('./../../../resources/images/postillon.png');

export class ArticlesNavbar extends PureComponent {

    render() {
        const { styles, t } = this.props;

        return (
            <View style={styles.navbar} key={'navbar.article'}>
                <Image style={styles.image} source={postillon} resizeMode={'contain'} key={'navbar.article.image'} />
                <Text style={styles.title} key={'navbar.article.title'}>{t('appTitle')}</Text>
            </View>
        );
    }

}

export default ArticlesNavbar;