import React, { PureComponent } from 'react';
import ReactNative, {BackHandler, FlatList, StatusBar, Text, View} from 'react-native';
import { Navigation } from 'react-native-navigation';

import { ThemeManager } from '@postillon/react-native-theme';

import { getCategoriesByLocale } from './../../../constants/categories';
import { Config } from '../../../constants';

import { debounce } from '../../../utils/util';

import { CategoryCard } from './../../../components/card';
import {Themes} from "../../../constants/themes";
import merge from "deepmerge";
import {getLocalizedString, Icons} from "../../../App";


export class CategoriesScreen extends PureComponent {

    static options(passProps) {
        const { theme = Themes.DEFAULT, locale } = passProps;
        const { defaults: screenStyle } = ThemeManager.getStyleSheetForComponent('screens', theme);

        return merge(screenStyle, {
            topBar: {
                visible: false,
                animate: true,
                hideOnScroll: false,
                drawBehind: true,

                leftButtons: [],
                rightButtons: [],
            },

            bottomTab: {
                text: getLocalizedString(locale,'categoriesList'),
                icon: Icons.grid,
                testID: 'TAB_CATEGORIES'
            }
        });
    };

    constructor(props, context) {
        super(props, context);

        // debounce navigation functions
        this.handleCardPressed = debounce(this.handleCardPressed, Config.debounce.navigation, this);

        const { width, navigator } = props;

        this.state = {
            numColumns: this.getNumColumns(width),
        };

        Navigation.events().bindComponent(this);
    }

    componentWillReceiveProps(nextProps) {
        const width = this.props.width;
        const nextWidth = nextProps.width;

        if (width !== nextWidth) {
            this.setState({
                numColumns: this.getNumColumns(nextWidth),
            });
        }
    }

    componentDidAppear() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPressed);
    }

    componentDidDisappear() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed);
    }

    onBackPressed = () => {
        const { componentId } = this.props;

        Navigation.mergeOptions(componentId, {
            bottomTabs: {
                currentTabIndex: 0,
            }
        });

        return true;
    };

    handleCardPressed = (category) => {
        const { componentId, theme, locale, t } = this.props;

        Navigation.push(componentId, {
            component: {
                name: 'postillon.categories.List',
                passProps: {
                    category,
                    theme,
                    locale
                },
                options: {
                    topBar: {
                        title: {
                            text: t(category),
                        }
                    }
                }
            }
        });
    };

    getNumColumns = (width) => ~~(width / 180) || 1;

    keyExtractor = (item, index) => item.selector || index;

    renderItem = ({item}) => (
        <CategoryCard category={item} onPress={this.handleCardPressed} />
    );

    render() {
        const { locale } = this.props;
        const { numColumns } = this.state;

        const categories = getCategoriesByLocale(locale);

        return (
            <FlatList
                data={categories}
                numColumns={numColumns}
                key={numColumns}

                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
            />
        );
    }

}

export default CategoriesScreen;