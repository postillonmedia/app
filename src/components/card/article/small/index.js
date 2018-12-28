/**
 * Created by DanielL on 16.06.2017.
 */

import { compose } from 'recompose';
import { ThemeManager, connectStyle } from '@postillon/react-native-theme';

import { Themes } from '../../../../constants/themes/index';
import styles from './styles';

import SmallArticleCardView from './SmallArticleCardView';


ThemeManager.addStyleSheet(styles.darkStyles, 'card.article.small', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'card.article.small', Themes.DEFAULT);


export default compose(

    connectStyle('card.article.small'),

)(SmallArticleCardView);