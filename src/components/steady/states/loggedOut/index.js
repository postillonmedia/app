import { compose } from 'recompose';
import { ThemeManager, connectStyle } from '@postillon/react-native-theme';
import { i18n } from '@postillon/react-native-i18n';

import { Themes } from './../../../../constants/themes';
import styles from './styles';

import SteadyLoggedOutView from './SteadyLoggedOutView';


ThemeManager.addStyleSheet(styles.darkStyles, 'steady.logged.out', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'steady.logged.out', Themes.DEFAULT);


export default compose(

    i18n('steady'),

    connectStyle('steady.logged.out'),

)(SteadyLoggedOutView);