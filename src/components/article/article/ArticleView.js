import PropTypes from 'prop-types';
import React, { Component, PureComponent } from 'react';
import ReactNative, { ActivityIndicator, Text, View } from 'react-native';

import firebase from 'react-native-firebase';
import FlexImage from 'react-native-flex-image';

import { walkthroughable, CopilotStep } from '@okgrow/react-native-copilot';

import { LocalizedDate } from '@postillon/react-native-timeago';

import { Config } from '../../../constants';

import Content from './../../../components/content';
import Recommendations from './../recommendations';

import ControlsScrollView from '../../../components/controlsscrollview';
import OfflineIndicator from '../../../components/offlineIndicator/image';
import { ImageContainer, OtherMediaContainer } from '../../../components/mediacontainer';

import { Zoomy } from '../../zoomy'


const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;

const CopilotView = walkthroughable(View);


export class ControlsView extends Component {

    static propTypes = {
        articleState: PropTypes.object,
        fontSize: PropTypes.number,
        isSubscribedToSteady: PropTypes.bool,
        initialControlVisibility: PropTypes.bool,

        onControlsVisibilityChange: PropTypes.func,
        onRecommendationPress: PropTypes.func,
    };

    static defaultProps = {
        fontSize: 14,
        isSubscribedToSteady: false,
        initialControlVisibility: true,
    };


    shouldComponentUpdate(nextProps, nextState) {
        const {
            articleState: nextArticleState,
            fontSize: nextFontSize,
            isSubscribedToSteady: nextIsSubscribedToSteady,
            theme: nextTheme,
            locale: nextLocale,
        } = nextProps;

        const {
            articleState: currentArticleState,
            fontSize: currentFontSize,
            isSubscribedToSteady: currentIsSubscribedToSteady,
            theme: currentTheme,
            locale: currentLocale,
        } = this.props;

        return !(
            nextArticleState === currentArticleState &&
            nextFontSize === currentFontSize &&
            nextIsSubscribedToSteady === currentIsSubscribedToSteady &&
            nextTheme === currentTheme &&
            nextLocale === currentLocale
        );
    }

    handleRecommendationPress = (article) => {
        const { onRecommendationPress } = this.props;

        onRecommendationPress && onRecommendationPress(article);
    };

    renderNotOnline = (props) => {
        return (
            <OfflineIndicator {...props} />
        );
    };

    renderImage = (props) => {
        const { constants } = this.props;

        return (
            <FlexImage {...props} loadingComponent={<ActivityIndicator color={constants.colors.activityIndicator} animating={true} size="large" />} />
        );
    };

    renderAd = (article, size = 'LARGE_BANNER') => {
        const { articleState, isSubscribedToSteady, styles, locale, t } = this.props;

        article = article || articleState.article;

        if (!isSubscribedToSteady) {
            const request = new AdRequest();
            for (let i = 0; i < article && article.labels && article.labels.length; i++) {
                const label = article.labels[i];

                request.addKeyword(label.label);
            }

            return (
                <OtherMediaContainer key={'ad_' + size}>
                    <View style={styles.adContainer}>
                        <Banner
                            size={size}
                            unitId={Config.keys.admob.banner}
                            request={request.build()}
                        />
                    </View>
                </OtherMediaContainer>
            );
        } else {
            return null;
        }
    };

    renderArticleImage = (article) => {
        const { styles, t } = this.props;

        if (article && article.image && typeof article.image === 'string') {
            return (
                <CopilotStep key={'step-image'} name={'image'} order={1} text={t('copilot.image')}>
                    <CopilotView key={'image'} style={styles.articleImageContainer}>
                        <Zoomy>
                            <ImageContainer
                                source={{ uri: article.image }}
                                style={styles.articleImage}

                                ImageComponent={FlexImage}

                                renderImageComponent={this.renderImage}
                                renderNotOnlineComponent={this.renderNotOnline}

                                borderRadius={10}
                            />
                        </Zoomy>
                    </CopilotView>
                </CopilotStep>
            );
        } else {
            return (
                <View key={'image'} style={styles.spacer} />
            );
        }
    };

    render() {
        const { articleState, fontSize, isSubscribedToSteady, initialControlVisibility, onControlsVisibilityChange, styles, locale, t } = this.props;

        const article = articleState.article;

        return (
            <View style={styles.container}>
                <ControlsScrollView onControlsVisibilityChange={onControlsVisibilityChange} initial={initialControlVisibility}>

                    {this.renderArticleImage(article)}

                    <Text key={'heading'} style={[styles.heading, {fontSize: fontSize * 1.5}]}>{article.title}</Text>

                    <View key={'seperator'} style={styles.line} />


                    <LocalizedDate key={'date'} style={styles.date} date={article.published} format={t('dateFormat')} locale={locale} />

                    {this.renderAd(article, 'BANNER')}

                    <Content key={'content'} baseFontSize={fontSize} html={article.html} baseUrl={article.url} imagesToExclude={[article.image]} />

                    {this.renderAd(article, 'MEDIUM_RECTANGLE')}

                    <Recommendations articleState={articleState} count={Config.article.recommendations} onArticlePress={this.handleRecommendationPress} renderAd={this.renderAd} />

                    <View key={'spacer'} style={styles.spacer} />

                </ControlsScrollView>
            </View>
        );
    }

}


export default ControlsView;