import React, { PureComponent } from 'react';
import ReactNative, { LayoutAnimation, Share, View } from 'react-native';
import PropTypes from 'prop-types';
import merge from 'deepmerge';

import { Navigation } from 'react-native-navigation';

import { ThemeManager} from '@postillon/react-native-theme';
import { Themes } from "../../../../constants/themes";

import ArticleEntity from '../../../../realm/schemas/article';

import InfoBar from '../../../../components/infobar';
import { Article, Controls, Loading } from '../../../../components/article'

import ModalArchiveAdd from '../../../modals/archive/add';
import ModalArchiveRemove from '../../../modals/archive/remove';
import ModalArticleSettings from '../../../modals/article/settings';
import ModalStateContainer from '../../../../components/modalstatecontainer';


export class SingleArticleScreen extends PureComponent {
    static displayName = 'Article';
    static componentName = 'Article';

    static propTypes = {
        stackId: PropTypes.string.isRequired,
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

    static options(passProps) {
        const { theme = Themes.DEFAULT } = passProps;
        const { article: screenStyle } = ThemeManager.getStyleSheetForComponent('screens', theme);

        return merge(screenStyle, {
            topBar: {
                animate: true,
                visible: false,
                hideOnScroll: false,
                drawBehind: true,

                backButton: undefined,

                leftButtons: [],
                rightButtons: [],

                // android
                height: 0,
            },

            bottomTabs: {
                visible: false,
                drawBehind: true,
            },
        });
    }

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
        const { stackId, componentId } = this.props;

        Navigation.pop(componentId);
    };

    handleLongBackPress = () => {
        const { stackId, componentId } = this.props;

        Navigation.popToRoot(stackId);
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
        const { componentId, t, theme, locale } = this.props;
        const { article: style } = ThemeManager.getStyleSheetForComponent('screens', theme);

        Navigation.push(componentId, {
            component: {
                name: 'postillon.article.Single',
                passProps: {
                    stackId: componentId,
                    articleId: article.id,
                    theme,
                    locale,
                },
            }
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

export default SingleArticleScreen;