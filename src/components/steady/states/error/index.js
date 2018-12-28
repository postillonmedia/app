import { compose } from 'recompose';
import { ThemeManager, connectStyle } from '@postillon/react-native-theme';
import { i18n } from '@postillon/react-native-i18n';

import { Themes } from './../../../../constants/themes';
import styles from './styles';

import SteadyErrorView from './SteadyErrorView';


ThemeManager.addStyleSheet(styles.darkStyles, 'steady.error', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'steady.error', Themes.DEFAULT);


export default compose(

    i18n('steady'),

    connectStyle('steady.error'),

)(SteadyErrorView);