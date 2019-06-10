import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactNative, {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    Share,
    View
} from 'react-native';

import { Navigation } from 'react-native-navigation';

import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

import { debounce } from '../../../utils/util';
import { Config } from '../../../constants';
import { Stacks } from "../../../App";

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

        width: PropTypes.number,
        topBarHeight: PropTypes.number,
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

        const { width } = props;

        Navigation.events().bindComponent(this);
        Navigation.events().registerBottomTabSelectedListener(this.bottomTabSelected.bind(this));

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

    navigationButtonPressed({ buttonId }) {
        if (buttonId === 'search') {
            this.handleSearchPressed();
        } else if (buttonId === 'postillon') {
            this.handleRefresh();
        }
    }

    bottomTabSelected({ selectedTabIndex, unselectedTabIndex }) {
        const { componentId, category } = this.props;

        if (selectedTabIndex === 1 && !!category) {
            // pop to root if the categories tab was reselected
            Navigation.popToRoot(componentId);
        }
    }

    getNumColumns = (width) => ~~(width / 275) || 1;

    getArticleSource = () => {
        const { page } = this.props;

        return page && page.articles || [];
    };

    handleSearchPressed = () => {
        const { componentId, theme, locale, category, blogId } = this.props;

        Navigation.push(componentId, {
            component: {
                id: 'postillon.Search',
                name: 'postillon.Search',
                passProps: {
                    initialCategory: category,
                    blogId,
                    theme,
                    locale,
                }
            }
        });
    };

    handleArticlePressed = (article) => {
        const { componentId, theme, locale, category, blogId } = this.props;

        Navigation.push(componentId, {
            component: {
                name: 'postillon.article.Single',
                passProps: {
                    blogId,
                    category,
                    stackId: Stacks.articles,
                    articleId: article.id,
                    theme,
                    locale,
                },
            }
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

        // TODO: reset badge of the Home screen on it's refresh
        // !category && navigator.setTabBadge({
        //     tabIndex: 0,
        //     badge: null,
        // });
    };

    handleFetchNext = () => {
        const { endReached, blogId, category } = this.props;

        endReached(blogId, category);
    };



    /******************************************************************************/
    /******************************* LIST  - Rendering ****************************/
    /******************************************************************************/

    refList = (ref) => this.list = ref;

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
        const { page, constants, topBarHeight } = this.props;

        return (
            <RefreshControl
                progressViewOffset={topBarHeight}
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
        const { page, blogId, category, styles, topBarHeight } = this.props;
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

                        ListHeaderComponent={<View />}
                        ListHeaderComponentStyle={{ height: topBarHeight }}
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