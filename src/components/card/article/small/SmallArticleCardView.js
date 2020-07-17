/**
 * Created by DanielL on 16.06.2017.
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ReactNative, { View, TouchableOpacity } from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import Text from '../../../text';
import { ImageContainer } from '../../../mediacontainer';
import { getImageUrl } from '../../../../utils/blogger';
import {Image} from 'react-native-svg';

const defaultImage = require('../../../../resources/images/imageNotFound.png');

export class SmallArticleCardView extends PureComponent {

    static displayName = 'ArchiveCard';
    static componentName = 'ArchiveCard';

    static propTypes = {
        article: PropTypes.object.isRequired,
        styles: PropTypes.object.isRequired,

        showArchiveButton: PropTypes.bool,

        onPress: PropTypes.func,
        onLongPress: PropTypes.func,
        onDeletePress: PropTypes.func,
    };

    constructor(props, context) {
        super(props, context);
    }

    handleCardPress = () => {
        const {article, onPress} = this.props;

        onPress && onPress(article);
    };

    handleCardLongPress = () => {
        const {article, onLongPress} = this.props;

        onLongPress && onLongPress(article);
    };

    handleDeletePress = () => {
        const {article, onDeletePress} = this.props;

        onDeletePress && onDeletePress(article);
    };

    renderNotOnline = (props) => <Image source={defaultImage} />;

    renderArchiveButton = () => {
        const { showArchiveButton ,styles, constants } = this.props;

        if (showArchiveButton) {
            return (
                <TouchableOpacity style={styles.button} onPress={this.handleDeletePress}>
                    <Feather name={'trash-2'} size={20} color={constants.colors.text.highlighted}/>
                </TouchableOpacity>
            );
        } else {
            return null;
        }
    };

    renderArticleImage = () => {
        const { article, styles } = this.props;

        if (article && article.image && typeof article.image === 'string') {
            const thumbnail = getImageUrl(article.image, 150);

            return (
                <ImageContainer
                    style={styles.image}
                    source={{uri: thumbnail}}
                    defaultSource={defaultImage}

                    renderNotOnlineComponent={this.renderNotOnline}
                />
            );
        } else {
            return null;
        }
    };

    render() {
        const { article, styles } = this.props;

        const image = this.renderArticleImage();

        const contentStyle = [styles.content, !image && styles.fill];

        return (
            <TouchableOpacity
                style={styles.touchable}
                onPress={this.handleCardPress}
                onLongPress={this.handleCardLongPress}
            >
                <View style={styles.card}>
                    {image}

                    <View style={contentStyle}>
                        <Text numberOfLines={3} style={styles.title}>{article.title}</Text>

                        {this.renderArchiveButton()}
                    </View>
                </View>

            </TouchableOpacity>
        );
    }
}

export default SmallArticleCardView;
