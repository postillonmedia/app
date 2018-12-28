import { Navigation } from '@postillon/react-native-navigation';
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
import ArticleScreen from './screens/article';
import SearchScreen from './screens/search';

import ArticlesNavbar from './navbars/articles';
import SearchNavbar from './navbars/search';


ThemeManager.addStyleSheet(styles.darkStyles, 'screens', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'screens', Themes.DEFAULT);


export function registerNavigationComponents(store, Provider) {
    // screens
    Navigation.registerComponent('postillon.Articles', () => ArticleListScreen, store, Provider);
    Navigation.registerComponent('postillon.Categories', () => CategoriesScreen, store, Provider);
    Navigation.registerComponent('postillon.categories.List', () => CategoryListScreen, store, Provider);
    Navigation.registerComponent('postillon.Archive', () => ArchiveScreen, store, Provider);
    Navigation.registerComponent('postillon.More', () => MoreScreen, store, Provider);
    Navigation.registerComponent('postillon.more.Settings', () => SettingsScreen, store, Provider);
    Navigation.registerComponent('postillon.more.About', () => AboutScreen, store, Provider);
    Navigation.registerComponent('postillon.more.Imprint', () => ImprintScreen, store, Provider);
    Navigation.registerComponent('postillon.more.PrivacyPolicy', () => PrivacyPolicyScreen, store, Provider);
    Navigation.registerComponent('postillon.Article', () => ArticleScreen, store, Provider);
    Navigation.registerComponent('postillon.Search', () => SearchScreen, store, Provider);

    // register navbars
    Navigation.registerComponent('postillon.navbars.Articles', () => ArticlesNavbar, store, Provider);
    Navigation.registerComponent('postillon.navbars.Search', () => SearchNavbar, store, Provider);
}