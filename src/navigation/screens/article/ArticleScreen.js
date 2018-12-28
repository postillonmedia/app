import React, { PureComponent } from 'react';
import ReactNative, { LayoutAnimation, Share, View } from 'react-native';
import PropTypes from 'prop-types';

import {ThemeManager} from '@postillon/react-native-theme';

import ArticleEntity from '../../../realm/schemas/article';

import InfoBar from '../../../components/infobar';
import { Article, Controls, Loading } from '../../../components/article'

import ModalArchiveAdd from '../../../navigation/modals/archive/add';
import ModalArchiveRemove from '../../../navigation/modals/archive/remove';
import ModalArticleSettings from '../../../navigation/modals/article/settings';
import ModalStateContainer from '../../../components/modalstatecontainer';


export class ArticleScreen extends PureComponent {
    static displayName = 'Article';
    static componentName = 'Article';

    static propTypes = {
        articleId: PropTypes.string.isRequired,

        fontSize: PropTypes.number,
        tutorial: PropTypes.bool,
        displayBackButton: PropTypes.bool,
        isSubscribedToSteady: PropTypes.bool,

        openArticle: PropTypes.func.isRequired,
        setTutorial: PropTypes.func.isRequired,
        start: PropTypes.func.isRequired,
    };

    static defaultProps = {
        fontSize: 14,
        displayBackButton: true,
    };

    modalArchiveAdd = null;
    modalArchiveRemove = null;
    modalSettings = null;

    constructor(props, context) {
        super(props, context);

        const { articleId, openArticle } = props;

        if (articleId) {
            openArticle(articleId);
        }

        this.state = {
            controlsVisible: true,
        };
    }


    componentDidMount() {
        const { tutorial, setTutorial, start } = this.props;

        if (tutorial) {
            start();
            setTutorial(false);
        }
    }
    

    handleBackPress = () => {
        const { navigator } = this.props;

        navigator.pop();
    };

    handleLongBackPress = () => {
        const { navigator } = this.props;

        navigator.popToRoot();
    };

    handleSettingsPress = () => {
        this.modalSettings.open();
    };

    handleArchivePress = () => {
        const { articleState } = this.props;

        const article = articleState.article;

        if (ArticleEntity.isArchivated(article)) {
            this.modalArchiveRemove.open();
        } else {
            this.modalArchiveAdd.open();
        }
    };

    handleSharePress = () => {
        const { articleState } = this.props;

        const article = articleState.article;

        Share.share({
            message: article.url,
            url: article.url,
            title: article.title,
        });
    };

    handleControlsVisibilityChanged = (controlsVisible) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ controlsVisible });
    };

    handleRecommendationPress = (article) => {
        const { navigator, t, theme } = this.props;
        const { article: style } = ThemeManager.getStyleSheetForComponent('screens', theme);

        navigator.push({
            screen: 'postillon.Article',
            navigatorStyle: style,
            passProps: {
                articleId: article.id,
            },
        });
    };


    renderControls = () => {
        const { articleState, displayBackButton } = this.props;
        const { controlsVisible } = this.state;

        if (controlsVisible) {
            return (
                <Controls
                    articleState={articleState}
                    displayBackButton={displayBackButton}

                    handleBackPress={this.handleBackPress}
                    handleLongBackPress={this.handleLongBackPress}
                    handleSettingsPress={this.handleSettingsPress}
                    handleArchivePress={this.handleArchivePress}
                    handleSharePress={this.handleSharePress}
                />
            );
        } else {
            return null;
        }
    };

    renderArticle = () => {
        const { controlsVisible } = this.state;
        const { articleState, isSubscribedToSteady, fontSize } = this.props;

        return (
            <Article
                articleState={articleState}
                fontSize={fontSize}
                isSubscribedToSteady={isSubscribedToSteady}
                initialControlVisibility={controlsVisible}

                onControlsVisibilityChange={this.handleControlsVisibilityChanged}
                onRecommendationPress={this.handleRecommendationPress}
            />
        );
    };

    render() {
        const { articleId, articleState, fontSize, styles } = this.props;

        let content = null;
        let controls = null;

        if (articleState && articleState.article) {
            content = this.renderArticle();
            controls = this.renderControls();
        } else {
            content = ( <Loading /> );
        }

        return (
            <View style={styles.container}>
                {content}

                {controls}

                <InfoBar error={articleState && articleState.error} />

                <ModalStateContainer ref={modal => (this.modalArchiveAdd = modal)} modal={<ModalArchiveAdd id={articleId} />} key={'modal.archive.add'} />
                <ModalStateContainer ref={modal => (this.modalArchiveRemove = modal)} modal={<ModalArchiveRemove id={articleId} key={'modal.archive.remove'} />} />
                <ModalStateContainer ref={modal => (this.modalSettings = modal)} modal={<ModalArticleSettings fontSize={fontSize} />} key={'modal.article.settings'} style={styles.settingsModal} />
            </View>
        );
    }
}

export default ArticleScreen;