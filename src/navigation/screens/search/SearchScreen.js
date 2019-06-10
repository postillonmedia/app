import React, { PureComponent } from 'react';
import ReactNative, { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Navigation } from 'react-native-navigation';

import merge from 'deepmerge';

import FeatherIcon from 'react-native-vector-icons/Feather';
import RNPopover from 'react-native-popover-menu';

import { Icons } from './../../../App';
import { getCategoriesByLocale } from '../../../constants/categories';
import { Periods, NoFilter } from '../../../constants/periods';

import { SmallArticleCard } from './../../../components/card'
import { ThemeManager } from "@postillon/react-native-theme";
import { Config } from "../../../constants";
import { debounce } from "../../../utils/util";
import { Themes } from "../../../constants/themes";


export class SearchScreen extends PureComponent {

    static options(passProps) {
        const { theme = Themes.DEFAULT } = passProps;
        const { search: style } = ThemeManager.getStyleSheetForComponent('screens', theme);

        return merge(style, {
            topBar: {
                hideOnScroll: false,
                elevation: 0,
                borderHeight: 0,

                backButton: undefined,

                title: {
                    component: {
                        name: 'postillon.navbars.Search',
                        alignment: 'fill',
                    }
                },

                leftButtons: [],
                rightButtons: [
                    {
                        id: 'close',
                        icon: Icons.close,

                        // iOS
                        systemItem: 'cancel'
                    }
                ],
            },
            bottomTabs: {
                visible: false,
                drawBehind: true,
            }
        });
    }

    constructor(props, context) {
        super(props, context);

        // debounce navigation functions
        this.handleArticlePressed = debounce(this.handleArticlePressed, Config.debounce.navigation, this);

        const { initializeSearch, blogId, initialCategory } = props;

        Navigation.events().bindComponent(this);

        // initialize search
        initializeSearch(blogId, initialCategory);
    }

    navigationButtonPressed({ buttonId }) {
        if (buttonId === 'close') {
            Navigation.pop(this.props.componentId);
        }
    }

    handlePeriodPressed = () => {
        const { t, constants } = this.props;

        const menus = [
            {
                label: t('period'),
                menus: Periods.map((period, index) => ({
                    label: t(period),
                }))
            }
        ];

        this.refPeriod && RNPopover.Show(this.refPeriod, {
            ...constants.styles.popover,
            title: t('period'),
            menus,
            perferedWidth: 200,
            onDone: this.handlePeriodSelectionDone,
        });
    };

    handlePeriodSelectionDone = (index, menuIndex) => {
        const { setSearchPeriod } = this.props;

        const selectionIndex = (typeof menuIndex === 'number' && menuIndex) || (typeof index === 'number' && index);
        const period = Periods[selectionIndex];

        setSearchPeriod(period);
    };

    handleCategoryPressed = () => {
        const { locale, t, constants } = this.props;

        const categories = getCategoriesByLocale(locale);

        const menus = [
            {
                label: t('category'),
                menus: categories.map((category, index) => ({
                    label: t(category),
                }))
            }
        ];

        this.refCategory && RNPopover.Show(this.refCategory, {
            ...constants.styles.popover,
            title: t('category'),
            menus,
            onDone: this.handleCategorySelectionDone,
        });
    };

    handleCategorySelectionDone = (index, menuIndex) => {
        const { setSearchCategory, locale } = this.props;

        const categories = getCategoriesByLocale(locale);
        const selectionIndex = (typeof menuIndex === 'number' && menuIndex) || (typeof index === 'number' && index);
        const category = categories[selectionIndex];

        setSearchCategory(category);
    };

    handleEndReached = () => {
        const { onEndReached } = this.props;

        onEndReached();
    };

    handleArticlePressed = (article) => {
        const { componentId, theme, locale } = this.props;
        const { article: style } = ThemeManager.getStyleSheetForComponent('screens', theme);

        Navigation.push(componentId,{
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

    _refPeriod = (ref) => {
        this.refPeriod = ref;
    };

    _refCategory = (ref) => {
        this.refCategory = ref;
    };

    renderItem = ({item}) => (
        <SmallArticleCard
            article={item}
            onPress={this.handleArticlePressed}
        />
    );

    keyExtractor = (items, index) => items.id || index;

    renderEmptyListComponent = () => {
        const { styles, t } = this.props;

        return (
            <View style={styles.emptyListContainer}>
                <Text style={styles.text}>{t('emptyList')}</Text>
            </View>
        );
    };

    renderListFooterComponent = () => {
        const { styles, constants, t, isSearching } = this.props;

        if (isSearching) {
            return (
                <View style={styles.listFooter}>
                    <ActivityIndicator size={'large'} animating={true} color={constants.colors.activityIndicator} />
                </View>
            );
        } else {
            return ( <View style={styles.spacer} /> );
        }
    };

    render() {
        const { styles, t, period, category, results } = this.props;

        const periodText = (period && t(period)) || t('period');
        const periodTextStyle = [
            styles.parameterOptionText,
            period && styles.parameterOptionTextSelected,
        ];

        const categoryText = (category && t(category)) || t('category');
        const categoryTextStyle = [
            styles.parameterOptionText,
            category && styles.parameterOptionTextSelected,
        ];

        return (
            <View style={styles.container}>
                <View style={styles.parameterBar}>
                    <View style={styles.parameterOption}>
                        <TouchableOpacity ref={this._refPeriod} onPress={this.handlePeriodPressed}>
                            <Text style={periodTextStyle}>{periodText} <FeatherIcon name={'chevron-down'} style={styles.parameterOptionText}/></Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.parameterOption}>
                        <TouchableOpacity ref={this._refCategory} onPress={this.handleCategoryPressed}>
                            <Text style={categoryTextStyle}>{categoryText} <FeatherIcon name={'chevron-down'} style={styles.parameterOptionText}/></Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <FlatList
                    style={styles.container}
                    key={'searchResultsList'}

                    data={results}

                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                    onEndReached={this.handleEndReached}

                    maxToRenderPerBatch={7}
                    removeClippedSubviews={true}

                    ListEmptyComponent={this.renderEmptyListComponent}
                    ListFooterComponent={this.renderListFooterComponent}
                />
            </View>
        );
    }

}

export default SearchScreen;