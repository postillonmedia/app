import React, { PureComponent } from 'react';
import ReactNative, { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import RNPopover from 'react-native-popover-menu';

import { iconsMap, isIconsMapLoaded } from './../../../app-icons';
import { getCategoriesByLocale } from '../../../constants/categories';
import { Periods, NoFilter } from '../../../constants/periods';

import { SmallArticleCard } from './../../../components/card'
import { ThemeManager } from "@postillon/react-native-theme";
import { Config } from "../../../constants";
import { debounce } from "../../../utils/util";


export class SearchScreen extends PureComponent {

    constructor(props, context) {
        super(props, context);

        // debounce navigation functions
        this.handleArticlePressed = debounce(this.handleArticlePressed, Config.debounce.navigation, this);

        const { constants, navigator, initializeSearch, blogId, initialCategory } = props;

        navigator.setOnNavigatorEvent(this.onNavigatorEvent);

        isIconsMapLoaded.then(() => {
            navigator.setButtons({
                rightButtons: [
                    {
                        icon: iconsMap['x'],
                        id: 'search-close', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
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

        // initialize search
        initializeSearch(blogId, initialCategory);
    }

    onNavigatorEvent = (event) => {
        if (event.type === 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id === 'search-close') { // this is the same id field from the static navigatorButtons definition
                const { navigator } = this.props;

                navigator.pop();
            }
        }
    };

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
        const { navigator, theme } = this.props;
        const { article: style } = ThemeManager.getStyleSheetForComponent('screens', theme);

        navigator.push({
            screen: 'postillon.Article',
            navigatorStyle: style,
            passProps: {
                articleId: article.id,
            },
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