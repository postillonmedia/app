import React, { Component, PureComponent } from 'react';
import ReactNative, { LayoutAnimation, Share, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import { Navigation } from 'react-native-navigation';
import { ThemeManager } from '@postillon/react-native-theme';

import ArticleEntity from '../../../../realm/schemas/article';

import InfoBar from '../../../../components/infobar';
import { Article, Controls, Loading } from '../../../../components/article';

import { TabBar, TabView } from 'react-native-tab-view';
import { Themes } from '../../../../constants/themes';
import merge from 'deepmerge';

import { store } from '../../../../redux/store';
import { getArticleById } from '../../../../redux/selectors/article';

import ModalArchiveAdd from '../../../modals/archive/add';
import ModalArchiveRemove from '../../../modals/archive/remove';
import ModalArticleSettings from '../../../modals/article/settings';
import ModalStateContainer from '../../../../components/modalstatecontainer';

export class SeriesArticleScreen extends Component {
    static displayName = 'SeriesArticle';
    static componentName = 'SeriesArticle';

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
        const { article: screenStyle } = ThemeManager.getStyleSheetForComponent(
            'screens',
            theme,
        );

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

    storeSubscription = null;

    constructor(props, context) {
        super(props, context);

        const { width, articleId, openArticle, page } = props;

        this.initialLayout = {
            height: 0,
            width: width,
        };

        let index = 0;
        const articles = page.articles;

        if (articleId) {
            openArticle(articleId);

            index = articles.findIndex((article, index, collection) => {
                return article.id === articleId;
            });
        }

        // set initial state
        this.state = {
            index: index || 0,
            routes: SeriesArticleScreen.getArticleRoutesFromPage(page),
            controlsVisible: true,
            articleState: {},
        };
    }

    componentDidMount() {
        // subscribe to redux store to get the current article state
        this.storeSubscription = store.subscribe(this.handleStoreUpdate);
    }

    componentWillUnmount() {
        // unsubscribe
        this.storeSubscription && this.storeSubscription();
    }

    static getDerivedStateFromProps(props, state) {
        const { page } = props;

        return {
            routes: SeriesArticleScreen.getArticleRoutesFromPage(page),
        };
    }

    static getArticleRoutesFromPage = page => {
        return page.articles
            .slice(0, page.pageNumber * 10)
            .map((article, index) => ({
                ...article,

                key: article.id,
            }));
    };

    shouldComponentUpdate(nextProps, nextState) {
        // state
        const {
            index: nextIndex,
            controlsVisible: nextControlsVisible,
            articleState: nextArticleState,
        } = nextState;

        const {
            index: currentIndex,
            controlsVisible: currentControlsVisible,
            articleState: currentArticleState,
        } = this.state;

        if (
            nextIndex !== currentIndex ||
            nextControlsVisible !== currentControlsVisible ||
            nextArticleState !== currentArticleState
        ) {
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

            lastArticleProcessing = 0,
        } = currentPage;

        if (
            nextIsReloading !== isReloading ||
            nextIsLoading !== isLoading ||
            nextIsFetching !== isFetching ||
            nextLastArticleProcessing > lastArticleProcessing
        ) {
            return true;
        }

        return false;
    }

    handleStoreUpdate = (index = this.state.index) => {
        const state = store.getState();

        const { articleState: currentArticleState, routes } = this.state;
        const article = routes[index];

        if (
            typeof article === 'object' &&
            typeof state === 'object' &&
            typeof state.article === 'object'
        ) {
            const nextArticleState = getArticleById(state, article.id);

            if (
                !!nextArticleState &&
                nextArticleState !== currentArticleState
            ) {
                this.setState({
                    articleState: {
                        ...nextArticleState,

                        article,
                    },
                });
            }
        }
    };

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

        if (ArticleEntity.isArchivated(article)) {
            this.modalArchiveRemove.open({
                id: article.id,
            });
        } else {
            this.modalArchiveAdd.open({
                id: article.id,
            });
        }
    };

    handleSharePress = () => {
        const { routes, index } = this.state;
        const article = routes[index];

        Share.share({
            message: article.url,
            url: article.url,
            title: article.title,
        });
    };

    handleControlsVisibilityChanged = controlsVisible => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ controlsVisible });
    };

    handleRecommendationPress = article => {
        const { componentId, t, theme, locale } = this.props;
        const { article: style } = ThemeManager.getStyleSheetForComponent(
            'screens',
            theme,
        );

        Navigation.push(componentId, {
            component: {
                name: 'postillon.article.Single',
                passProps: {
                    stackId: componentId,
                    articleId: article.id,
                    theme,
                    locale,
                },
            },
        });
    };

    _handleIndexChange = index => {
        const { routes } = this.state;
        const { openArticle } = this.props;

        // save state
        this.setState({
            index,
        });

        // paginate if needed
        if (index + 2 >= routes.length) {
            const { endReached, blogId, category } = this.props;

            endReached(blogId, category);
        }

        // open article
        const route = routes[index];
        openArticle(route.id);

        // update
        this.handleStoreUpdate(index);
    };

    _renderHeader = props => {
        return null;
    };

    _renderLazyPlaceholder = props => {
        return <Loading />;
    };

    _renderScene = ({ route }) => {
        const { navigator } = this.props;
        const { index, routes, controlsVisible, articleState } = this.state;

        const routeIndex = routes.findIndex(element => element.id === route.id);

        if (Math.abs(index - routeIndex) > 1) {
            return <View />;
        }

        const { isSubscribedToSteady, fontSize } = this.props;

        // set article to the current route to avoid rerender the scene
        const clonedArticleState = {
            ...articleState,

            article: route,
        };

        return (
            <Article
                articleState={clonedArticleState}
                fontSize={fontSize}
                isSubscribedToSteady={isSubscribedToSteady}
                initialControlVisibility={controlsVisible}
                onControlsVisibilityChange={
                    this.handleControlsVisibilityChanged
                }
                onRecommendationPress={this.handleRecommendationPress}
            />
        );
    };

    _renderControls = () => {
        const { displayBackButton } = this.props;
        const { controlsVisible, articleState } = this.state;

        if (controlsVisible && articleState && articleState.article) {
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
        const { articleId, fontSize, styles } = this.props;
        const { articleState } = this.state;

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

                <InfoBar error={articleState && articleState.error} />

                <ModalStateContainer
                    ref={modal => (this.modalArchiveAdd = modal)}
                    modal={<ModalArchiveAdd id={undefined} />}
                    key={'modal.archive.add'}
                />
                <ModalStateContainer
                    ref={modal => (this.modalArchiveRemove = modal)}
                    modal={<ModalArchiveRemove id={undefined} />}
                    key={'modal.archive.remove'}
                />
                <ModalStateContainer
                    ref={modal => (this.modalSettings = modal)}
                    modal={<ModalArticleSettings fontSize={fontSize} />}
                    key={'modal.article.settings'}
                    style={styles.settingsModal}
                />
            </View>
        );
    }
}

export default SeriesArticleScreen;
