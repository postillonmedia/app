import { ThemeManager } from '@postillon/react-native-theme';

import { Themes } from './../../constants/themes';
import styles from './styles';

import ArticleComponent from './article';
import LoadingComponent from './loading';
import ControlsComponent from './controls';


ThemeManager.addStyleSheet(styles.darkStyles, 'article', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'article', Themes.DEFAULT);


export const Article = ArticleComponent;
export const Loading = LoadingComponent;
export const Controls = ControlsComponent;

export default {
    Article,
    Loading,
    Controls,
};