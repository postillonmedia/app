/**
 * Created by DanielL on 16.06.2017.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactNative, { ActivityIndicator, Image, View, TouchableOpacity, LayoutAnimation } from 'react-native';

import OfflineIndicator from '../../../offlineIndicator/image';
import { TimeAgo } from '@postillon/react-native-timeago';

import Feather from 'react-native-vector-icons/Feather';

import Text from '../../../text';
import { ImageContainer } from '../../../mediacontainer';
import Article from '../../../../realm/schemas/article';

import Thumbnail from '../../../thumbnail';

import { getImageUrl } from '../../../../utils/blogger'
import * as HTMLRenderer from "../../../content/native/renderer";
import {IGNORED_TAGS} from "../../../content/native/HTMLUtils";


export class ArticleCardView extends PureComponent {

    static displayName = 'ArticleCard';
    static componentName = 'ArticleCard';

    static propTypes = {
        article: PropTypes.object.isRequired,
        displayArticleIntroduction: PropTypes.bool,

        locale: PropTypes.string.isRequired,
        styles: PropTypes.object.isRequired,
        t: PropTypes.func.isRequired,

        onPress: PropTypes.func,
        onLongPress: PropTypes.func,
        onArchivePress: PropTypes.func,
    };

    static defaultProps = {
        displayArticleIntroduction: true,
    };

    constructor(props, context) {
        super(props, context);
    }

    onCardPress = () => {
        const { article, onPress } = this.props;

        onPress && onPress(article);
    };

    onCardLongPress = () => {
        const { article, onLongPress } = this.props;

        onLongPress && onLongPress(article);
    };

    onArchivePress = (event) => {
        const { article, onArchivePress } = this.props;

        onArchivePress && onArchivePress(article);

    };

    renderArchivateButton = () => {
        const { article, articleState, styles, constants } = this.props;
        const isArchivating = (articleState && articleState.isArchivating) || false;

        if (isArchivating) {
            return (
                <ActivityIndicator animating={true} color={constants.colors.activityIndicator} />
            );
        } else {
            return (
                <TouchableOpacity
                    style={styles.buttonTouchable}
                    hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                    onPress={this.onArchivePress}
                >
                    <Feather
                        color={constants.colors.text.highlighted}
                        name={Article.isArchivated(article) ? 'trash-2' : 'download'}
                        size={20}
                    />
                </TouchableOpacity>
            );
        }
    };

    renderImageComponent = ({source, ...props}) => {
        if (typeof source === 'object' && typeof source.uri === 'string' && source.uri.startsWith('http')) {
            source.uri = getImageUrl(source.uri, 400);
        }

        return (
            <Image source={source} {...props} />
        )
    };

    renderArticleImage = () => {
        const { article, styles } = this.props;

        if (article && article.image && typeof article.image === 'string') {
            return (
                <View style={styles.imageContainer}>
                    <ImageContainer
                        style={styles.image}
                        source={{uri: article.image}}

                        renderImageComponent={this.renderImageComponent}
                        renderNotOnlineComponent={this.renderNotOnline}
                    />
                </View>
            );
        } else {
            return null;
        }
    };

    renderArticleIntroduction = () => {
        const { article, displayArticleIntroduction, styles } = this.props;

        if (!displayArticleIntroduction) {
            return null;
        }

        const introduction = Article.getIntroduction(article);

        if (introduction.length > 0) {
            return (
                <Text numberOfLines={4} ellipsizeMode={'tail'} style={styles.introduction}>{introduction}</Text>
            );
        } else {
            return null;
        }
    };

    renderNotOnline = (props) => {
        return (
            <OfflineIndicator {...props} />
        );
    };

    render() {
        const { article, styles, locale, t } = this.props;

        const image = this.renderArticleImage();
        const introduction = this.renderArticleIntroduction();

        return (
            <TouchableOpacity
                style={styles.touchable}
                onPress={this.onCardPress}
                onLongPress={this.onCardLongPress}
            >
                <View style={styles.cardContainer}>

                    <View style={[styles.textContainer, image && styles.textContainerWithImage]}>
                        <TimeAgo style={styles.date} locale={locale} hideAgo={false} time={article.published} />

                        <Text style={styles.title}>{article.title}</Text>

                        {introduction}
                    </View>

                    {image}

                    <View style={styles.button}>
                        { this.renderArchivateButton() }
                    </View>
                </View>


            </TouchableOpacity>
        );
    }
}

export default ArticleCardView;