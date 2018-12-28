import React, { PureComponent } from 'react';
import ReactNative, {BackHandler, FlatList, StatusBar, Text, View} from 'react-native';

import { ThemeManager } from '@postillon/react-native-theme';

import { getCategoriesByLocale } from './../../../constants/categories';
import { Config } from '../../../constants';

import { debounce } from '../../../utils/util';

import { CategoryCard } from './../../../components/card';


export class CategoriesScreen extends PureComponent {

    constructor(props, context) {
        super(props, context);

        // debounce navigation functions
        this.handleCardPressed = debounce(this.handleCardPressed, Config.debounce.navigation, this);

        const { width, navigator } = props;

        this.state = {
            numColumns: this.getNumColumns(width),
        };

        navigator.setOnNavigatorEvent(this.handleNavigatorEvent);
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

    onBackPressed = () => {
        const { navigator } = this.props;

        navigator.switchToTab({
            tabIndex: 0,
        });

        return true;
    };

    handleNavigatorEvent = (event) => {
        const { id } = event;

        if (id === 'willAppear') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackPressed);
        } else if (id === 'willDisappear') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed);
        }
    };

    handleCardPressed = (category) => {
        const { navigator, t, theme } = this.props;
        const { defaults: style } = ThemeManager.getStyleSheetForComponent('screens', theme);

        navigator.push({
            screen: 'postillon.categories.List',
            title: t(category),
            navigatorStyle: style,
            passProps: {
                category
            },
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