import { compose } from 'recompose';
import { ThemeManager, connectStyle } from '@postillon/react-native-theme';
import { i18n } from '@postillon/react-native-i18n';

import { Themes } from './../../../../constants/themes';
import styles from './styles';

import SteadyLoggedInView from './SteadyLoggedInView';



ThemeManager.addStyleSheet(styles.darkStyles, 'steady.logged.in', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'steady.logged.in', Themes.DEFAULT);


export default compose(

    i18n('steady'),

    connectStyle('steady.logged.in'),

)(SteadyLoggedInView);