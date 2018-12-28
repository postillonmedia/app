import { compose } from 'recompose';
import {connectStyle, ThemeManager} from '@postillon/react-native-theme';
import { i18n } from '@postillon/react-native-i18n';

import { Themes } from './../../../constants/themes';
import styles from './styles';

import ArticlesNavbarView from './ArticlesNavbar';


ThemeManager.addStyleSheet(styles.darkStyles, 'navbar.articles', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'navbar.articles', Themes.DEFAULT);


const ArticlesNavbar = compose(
    i18n('articlesList'),
    connectStyle('navbar.articles')
)(ArticlesNavbarView);

// set static navigator styles
ArticlesNavbar.navigatorStyle = {
    navBarComponentAlignment: 'fill',
};

// export SearchNavbar as default
export default ArticlesNavbar;