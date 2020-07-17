import React from 'react';

import { Navigation } from 'react-native-navigation';
import { ThemeManager } from '@postillon/react-native-theme';

import { Themes } from './../constants/themes';
import styles from './screens/styles/index';

import ArticleListScreen from './screens/list/article';
import CategoryListScreen from './screens/list/category';
import CategoriesScreen from './screens/categories';
import ArchiveScreen from './screens/archive';
import MoreScreen from './screens/more';
import SettingsScreen from './screens/more/settings';
import AboutScreen from './screens/more/about';
import ImprintScreen from './screens/more/imprint';
import PrivacyPolicyScreen from './screens/more/privacypolicy';
import SingleArticleScreen from './screens/article/single';
import SeriesArticleScreen from './screens/article/series';
import SearchScreen from './screens/search';

import SearchNavbar from './navbars/search';


ThemeManager.addStyleSheet(styles.darkStyles, 'screens', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'screens', Themes.DEFAULT);





export function registerNavigationComponents(store, Provider) {
    // component provider function
    const componentProvider = (Component) => () => (props) => (
        <Provider store={store}>
            <Component {...props} />
        </Provider>
    );

    // screens
    Navigation.registerComponent('postillon.Articles', componentProvider(ArticleListScreen), () => ArticleListScreen);
    Navigation.registerComponent('postillon.Categories', componentProvider(CategoriesScreen), () => CategoriesScreen);
    Navigation.registerComponent('postillon.categories.List', componentProvider(CategoryListScreen), () => CategoryListScreen);
    Navigation.registerComponent('postillon.Archive', componentProvider(ArchiveScreen), () => ArchiveScreen);
    Navigation.registerComponent('postillon.More', componentProvider(MoreScreen), () => MoreScreen);
    Navigation.registerComponent('postillon.more.Settings', componentProvider(SettingsScreen), () => SettingsScreen);
    Navigation.registerComponent('postillon.more.About', componentProvider(AboutScreen), () => AboutScreen);
    Navigation.registerComponent('postillon.more.Imprint', componentProvider(ImprintScreen), () => ImprintScreen);
    Navigation.registerComponent('postillon.more.PrivacyPolicy', componentProvider(PrivacyPolicyScreen), () => PrivacyPolicyScreen);
    Navigation.registerComponent('postillon.article.Single', componentProvider(SingleArticleScreen), () => SingleArticleScreen);
    Navigation.registerComponent('postillon.article.Series', componentProvider(SeriesArticleScreen), () => SeriesArticleScreen);
    Navigation.registerComponent('postillon.Search', componentProvider(SearchScreen), () => SearchScreen);

    // register navbars
    Navigation.registerComponent('postillon.navbars.Search', componentProvider(SearchNavbar), () => SearchNavbar);
}