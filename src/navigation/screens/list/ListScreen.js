import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import ReactNative, { ActivityIndicator, Alert, Animated, Easing, FlatList, RefreshControl, Share, TouchableOpacity, View } from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

import { ThemeManager } from '@postillon/react-native-theme';
import { iconsMap, isIconsMapLoaded } from '../../../app-icons';
import { debounce } from '../../../utils/util';
import { Config } from '../../../constants';

import Article from '../../../realm/schemas/article';

import Text from '../../../components/text';
import InfoBar from '../../../components/infobar';

import { ArticleCard } from '../../../components/card';

import ModalArchiveAdd from '../../../navigation/modals/archive/add';
import ModalArchiveRemove from '../../../navigation/modals/archive/remove';
import ModalStateContainer from '../../../components/modalstatecontainer';


export class ListScreen extends Component {

    static propTypes = {
        blogId: PropTypes.string.isRequired,
        category: PropTypes.string,
        page: PropTypes.object,

        isConnected: PropTypes.bool,

        initializeCategory: PropTypes.func.isRequired,
        reloadCategory: PropTypes.func.isRequired,
        endReached: PropTypes.func.isRequired,

        locale: PropTypes.string.isRequired,

        constants: PropTypes.object.isRequired,
        styles: PropTypes.object.isRequired,
    };

    modalArchiveAdd = null;
    modalArchiveRemove = null;

    constructor(props, context) {
        super(props, context);

        // debounce navigation functions
        this.handleSearchPressed = debounce(this.handleSearchPressed, Config.debounce.navigation, this);
        this.handleArticlePressed = debounce(this.handleArticlePressed, Config.debounce.navigation, this);

        const { constants, navigator, width } = props;

        navigator.setOnNavigatorEvent(this.handleNavigatorEvent);

        isIconsMapLoaded.then(() => {
            navigator.setButtons({
                rightButtons: [
                    {
                        icon: iconsMap['search'],
                        id: 'search', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
                        testID: 'e2e_rules', // optional, used to locate this view in end-to-end tests
                        showAsAction: 'always', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
                        buttonColor: constants.colors.text.primary, // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
                        buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
                        buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
                    }
                ],
                animated: false,
            });
        });

        this.state = {
            numColumns: this.getNumColumns(width),
            articles: this.getArticleSource().slice(0, 10),

            isModalArchiveAddVisible: false,
            isModalArchiveRemoveVisible: false,
        };
    }

    componentWillMount() {
        const { initializeCategory, blogId, category } = this.props;

        initializeCategory(blogId, category);
    }

    componentWillReceiveProps(nextProps) {
        const partialState = {};

        const width = this.props.width;
        const nextWidth = nextProps.width;

        if (width !== nextWidth) {
            partialState['numColumns'] = this.getNumColumns(nextWidth);
        }


        const page = this.props.page;
        const nextPage = nextProps.page;

        if (page && nextPage) {
            if (nextPage.pageNumber) {
                const length = nextPage.pageNumber * 10;

                partialState['articles'] = this.getArticleSource().slice(0, length);
            }
        } else if (!nextPage) {
            const { initializeCategory, blogId, category } = nextProps;

            initializeCategory(blogId, category);
        }


        const locale = this.props.locale;
        const nextLocale = nextProps.locale;

        if (nextLocale !== locale) {
            const { initializeCategory, blogId, category } = nextProps;

            initializeCategory(blogId, category);
        }


        // set state if the above code has something in the state
        if (partialState.numColumns || partialState.articles) {
            this.setState(partialState);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {

        // state
        const { articles: nextData, numColumns: nextNumColumns } = nextState;
        const { articles: currentData, numColumns: currentNumColumns } = this.state;

        if (((nextData && nextData.length) || 0) > ((currentData && currentData.length) || 0)) {
            return true;
        }

        if (nextNumColumns !== currentNumColumns) {
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

    getNumColumns = (width) => ~~(width / 275) || 1;

    getArticleSource = () => {
        const { page } = this.props;

        return page && page.articles || [];
    };



    handleNavigatorEvent = (event) => {
        const { id, type } = event;
        const { navigator, category } = this.props;

        if (type === 'NavBarButtonPress') {
            if (id === 'search') {
                this.handleSearchPressed();
            }
        } else if (type === 'DeepLink' && !category) {
            const { link, payload } = event;

            const parts = link.split('/');

            if (parts[1] === 'article') {
                const { blogId, path } = payload;
                const { theme } = this.props;
                const { article: style } = ThemeManager.getStyleSheetForComponent('screens', theme);

                navigator.push({
                    screen: 'postillon.Article',
                    navigatorStyle: style,
                    passProps: {
                        articleId: blogId + path,
                    },
                });

                navigator.switchToTab({
                    tabIndex: 0,
                });
            } else if (parts[1] === 'notification' && parts[2] === 'article') {
                const { constants, reloadCategory, blogId, category } = this.props;

                navigator.setTabBadge({
                    tabIndex: 0,
                    badge: ' ',
                    badgeColor: constants.colors.brandPrimary,
                });

                // refresh this screen to pull the new article
                reloadCategory(blogId, category);
            }

        } else if (id === 'bottomTabSelected' && !category) {

            // reset badge on selection of the Home screen
            navigator.setTabBadge({
                tabIndex: 0,
                badge: null,
            });

        } else if (id === 'bottomTabReselected' && !!category) {

            // pop to root if the categories tab was reselected
            navigator.popToRoot();
        }
    };

    handleSearchPressed = () => {
        const { navigator, theme, category, blogId } = this.props;
        const { search: style } = ThemeManager.getStyleSheetForComponent('screens', theme);

        navigator.push({
            screen: 'postillon.Search',
            backButtonHidden: true,
            navigatorStyle: style,
            passProps: {
                initialCategory: category,
                blogId,
            }
        });
    };

    handleArticlePressed = (article) => {
        const { navigator, category, blogId, t, theme } = this.props;
        const { article: style } = ThemeManager.getStyleSheetForComponent('screens', theme);

        navigator.push({
            screen: 'postillon.Article',
            navigatorStyle: style,
            passProps: {
                blogId,
                category: category || null,
                articleId: article.id,
            },
        });
    };

    handleArticleLongPressed = (article) => {
        article && Share.share({
            message: article.url,
            url: article.url,
            title: article.title,
        });
    };

    handleArticleArchivePressed = (article) => {
        if (Article.isArchivated(article)) {
            this.modalArchiveRemove.open({
                id: article.id,
            });
        } else {
            this.modalArchiveAdd.open({
                id: article.id,
            });
        }
    };

    handleRefresh = () => {
        const { reloadCategory, blogId, category, navigator } = this.props;

        reloadCategory(blogId, category);

        // reset badge of the Home screen on it's refresh
        !category && navigator.setTabBadge({
            tabIndex: 0,
            badge: null,
        });
    };

    handleFetchNext = () => {
        const { endReached, blogId, category } = this.props;

        endReached(blogId, category);
    };



    /******************************************************************************/
    /******************************* LIST  - Rendering ****************************/
    /******************************************************************************/

    keyExtractor = (items, index) => items.id || index;

    renderItem = ({item}) => (
        <ArticleCard
            article={item}
            onPress={this.handleArticlePressed}
            onLongPress={this.handleArticleLongPressed}
            onArchivePress={this.handleArticleArchivePressed}
        />
    );

    renderEmptyListComponent = () => {
        const { page, styles, t } = this.props;

        const isFetchingData = (page && (page.isFetching || page.isReloading)) || false;

        if (!isFetchingData) {
            return (
                <View style={styles.emptyListContainer}>
                    <Text style={[styles.text, styles.heading]}>¯\_(ツ)_/¯</Text>
                    <Text style={styles.text}>{t('emptySubtext')}</Text>
                </View>
            );
        } else {
            return null;
        }
    };


    renderListFooter = () => {
        const { page, isConnected, styles, constants, t } = this.props;

        const isLoadingData = page && page.isLoading;

        if (!isConnected) {
            return (
                <View style={styles.listFooter}>
                    <LinearGradient colors={constants.colors.gradient.highlighted} style={styles.listFooterNotConnected}>
                        <Text style={styles.listFooterNotConnectedText}>{t('listFooterNotConnected')}</Text>
                        <Feather size={26} color={constants.colors.text.negative} name={'wifi-off'} style={styles.listFooterNotConnectedIcon} />
                    </LinearGradient>
                </View>
            );
        } else if (isLoadingData) {
            return (
                <View style={styles.listFooter}>
                    <ActivityIndicator animating={true} size={'large'} color={constants.colors.activityIndicator} />
                </View>
            );
        } else {
            return null;
        }
    };

    renderRefreshControl = () => {
        const { page, constants } = this.props;

        return (
            <RefreshControl
                refreshing={page.isReloading || false}
                onRefresh={this.handleRefresh}
                tintColor={constants.colors.refreshControl.tintColor}
                colors={constants.colors.refreshControl.colors}
                progressBackgroundColor={constants.colors.refreshControl.background}
            />
        );
    };



    /******************************************************************************/
    /******************************* RENDERING ************************************/
    /******************************************************************************/

    render() {
        const { page, blogId, category, styles } = this.props;
        const { articles, numColumns } = this.state;

        if (page) {
            return (
                <View style={styles.container}>
                    <FlatList
                        key={blogId + category + numColumns}

                        data={articles}
                        renderItem={this.renderItem}

                        keyExtractor={this.keyExtractor}

                        numColumns={numColumns}
                        windowSize={5}
                        maxToRenderPerBatch={5}
                        removeClippedSubviews={true}

                        refreshControl={this.renderRefreshControl()}

                        ListEmptyComponent={this.renderEmptyListComponent}
                        ListFooterComponent={this.renderListFooter}
                        onEndReached={this.handleFetchNext}
                    />

                    <InfoBar error={page && page.error} />

                    <ModalStateContainer ref={modal => (this.modalArchiveAdd = modal)} modal={<ModalArchiveAdd />} />
                    <ModalStateContainer ref={modal => (this.modalArchiveRemove = modal)} modal={<ModalArchiveRemove />} />
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <InfoBar />

                    {this.renderEmptyListComponent()}
                </View>
            );
        }
    }

}

export default ListScreen;