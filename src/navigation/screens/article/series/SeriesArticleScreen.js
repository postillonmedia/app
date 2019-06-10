import React, { Component, PureComponent } from 'react';
import ReactNative, {LayoutAnimation, Share, Text, View} from 'react-native';
import PropTypes from 'prop-types';

import { Navigation } from 'react-native-navigation'
import { ThemeManager } from '@postillon/react-native-theme';

import ArticleEntity from '../../../../realm/schemas/article';

import InfoBar from '../../../../components/infobar';
import { Article, Controls, Loading } from '../../../../components/article'

import {TabBar, TabView} from "react-native-tab-view";
import {Themes} from "../../../../constants/themes";
import merge from "deepmerge";
import {getArticleById} from "../../../../redux/selectors/article";

import ModalArchiveAdd from '../../../modals/archive/add';
import ModalArchiveRemove from '../../../modals/archive/remove';
import ModalArticleSettings from '../../../modals/article/settings';
import ModalStateContainer from '../../../../components/modalstatecontainer';


export class SeriesArticleScreen extends Component {
    static displayName = 'Article';
    static componentName = 'Article';

    static propTypes = {
        blogId: PropTypes.string.isRequired,
        articleId: PropTypes.string.isRequired,
        category: PropTypes.string,

        width: PropTypes.number.isRequired,

        fontSize: PropTypes.number,
        tutorial: PropTypes.bool,
        displayBackButton: PropTypes.bool,
        isSubscribedToSteady: PropTypes.bool,

        openArticle: PropTypes.func.isRequired,
        endReached: PropTypes.func.isRequired,
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

        const { width, articleId, openArticle, page } = props;

        this.initialLayout = {
            height: 0,
            width: width,
        };


        const articles = page.articles;

        const index = articles.findIndex((article, index, collection) => {
            return article.id === articleId;
        });

        this.state = {
            index: index || 0,
            routes: this._getArticleRoutesFromPage(page),
            controlsVisible: true,
        };
    }

    componentWillReceiveProps(nextProps) {
        const { page } = nextProps;

        this.setState({
            routes: this._getArticleRoutesFromPage(page),
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        // state
        const { index: nextIndex, controlsVisible: nextControlsVisible } = nextState;
        const { index: currentIndex, controlsVisible: currentControlsVisible } = this.state;

        if (nextIndex !== currentIndex || nextControlsVisible !== currentControlsVisible) {
            return true;
        }


        // props
        const { locale: nextLocale, page: nextPage = {} } = nextProps;
        const { locale: currentLocale, page: currentPage = {} } = this.props;

        if (nextLocale !== currentLocale) {
            return true;
        }


        const {
            isReloading: nextIsReloading = false,
            isLoading: nextIsLoading = false,
            isFetching: nextIsFetching = false,

            lastArticleProcessing: nextLastArticleProcessing = 0,
        } = nextPage;

        const {
            isReloading = false,
            isLoading = false,
            isFetching = false,

            lastArticleProcessing = 0
        } = currentPage;

        if (nextIsReloading !== isReloading || nextIsLoading !== isLoading || nextIsFetching !== isFetching || nextLastArticleProcessing > lastArticleProcessing) {
            return true;
        }

        return false;

    }

    handleBackPress = () => {
        const { componentId } = this.props;

        Navigation.pop(componentId);
    };

    handleLongBackPress = () => {
        const { componentId } = this.props;

        Navigation.popToRoot(componentId);
    };

    handleSettingsPress = () => {
        this.modalSettings.open();
    };

    handleArchivePress = () => {
        const { routes, index } = this.state;

        const article = routes[index];

        // const article = articleState.article;

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
        const { componentId, t, theme } = this.props;
        const { article: style } = ThemeManager.getStyleSheetForComponent('screens', theme);

        // TODO
        // Navigation.push({
        //     stackId: componentId,
        //     screen: 'postillon.article.Single',
        //     navigatorStyle: style,
        //     passProps: {
        //         articleId: article.id,
        //     },
        // });
    };

    _getArticleRoutesFromPage = page => page.articles.slice(0, page.pageNumber * 10).map((article, index) => ({
        ...article,

        key: article.id,
    }));

    _handleIndexChange = index => {
        const { routes } = this.state;
        const { openArticle } = this.props;

        // paginate if needed
        if (index + 2 >= routes.length) {
            const { endReached, blogId, category } = this.props;

            endReached(blogId, category);
        }

        // open article
        const route = routes[index];
        openArticle(route.articleId);

        // save state
        this.setState({
            index,
        });
    };

    _renderHeader = props => {
        return null;
    };

    _renderLazyPlaceholder = props => {
        return (
            <Text>Loading ...</Text>
        );
    };

    _renderScene = ({ route }) => {
        const { navigator } = this.props;
        const { index, routes, controlsVisible } = this.state;

        // if (Math.abs(index - routes.indexOf(route)) > 2) {
        //     return null;
        // }

        const { isSubscribedToSteady, fontSize, redux } = this.props;

        const articleState = getArticleById(redux, route.articleId) || {};

        if (!articleState.article) {
            articleState.article = route;
        }

        return (
            <Article
                articleState={articleState}
                fontSize={fontSize}
                isSubscribedToSteady={isSubscribedToSteady}
                initialControlVisibility={controlsVisible}

                onControlsVisibilityChange={this.handleControlsVisibilityChanged}
                onRecommendationPress={() => {}}
            />
        );
    };

    _renderControls = () => {
        const { displayBackButton, redux } = this.props;
        const { index, routes, controlsVisible } = this.state;

        const route = routes[index];
        const articleState = getArticleById(redux, route.articleId);

        if (controlsVisible && articleState) {
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

    render() {
        const { articleId, articleState, fontSize, styles } = this.props;

        return (
            <View style={styles.container}>
                <TabView
                    style={styles.tabs}
                    lazy={true}

                    renderTabBar={this._renderHeader}
                    renderScene={this._renderScene}
                    renderLazyPlaceholder={this._renderLazyPlaceholder}

                    navigationState={this.state}
                    onIndexChange={this._handleIndexChange}
                    initialLayout={this.initialLayout}
                />

                {this._renderControls()}

                <ModalStateContainer ref={modal => (this.modalArchiveAdd = modal)} modal={<ModalArchiveAdd id={articleId} />} key={'modal.archive.add'} />
                <ModalStateContainer ref={modal => (this.modalArchiveRemove = modal)} modal={<ModalArchiveRemove id={articleId} key={'modal.archive.remove'} />} />
                <ModalStateContainer ref={modal => (this.modalSettings = modal)} modal={<ModalArticleSettings fontSize={fontSize} />} key={'modal.article.settings'} style={styles.settingsModal} />
            </View>
        );
    }
}

export default SeriesArticleScreen;