import { compose } from 'recompose';
import { i18n } from '@postillon/react-native-i18n';
import { ThemeManager, connectStyle } from '@postillon/react-native-theme';

import { Themes } from './../../../../../constants/themes';
import styles from './styles';

import OfflineArchiveView from './OfflineArchiveView';


ThemeManager.addStyleSheet(styles.darkStyles, 'screen.archive.offline', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'screen.archive.offline', Themes.DEFAULT);


export default compose(

    i18n('archive'),

    connectStyle('screen.archive.offline'),

)(OfflineArchiveView);