import { compose } from 'recompose';
import { i18n } from '@postillon/react-native-i18n';
import { ThemeManager, connectStyle } from '@postillon/react-native-theme';

import { Themes } from './../../../constants/themes';
import styles from './styles';

import CategoriesCardView from './CategoriesCardView';


ThemeManager.addStyleSheet(styles.darkStyles, 'card.category', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'card.category', Themes.DEFAULT);


export default compose(

    i18n('categories'),

    connectStyle('card.category')

)(CategoriesCardView);