import { compose } from 'recompose';
import { ThemeManager, connectStyle } from '@postillon/react-native-theme';
import { i18n } from '@postillon/react-native-i18n';

import { Themes } from '../../../constants/themes';
import styles from './styles';

import OtherOfflineIndicatorView from './OtherOfflineIndicatorView';


ThemeManager.addStyleSheet(styles.darkStyles, 'offline.indicator.other', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'offline.indicator.other', Themes.DEFAULT);


export default compose(

    i18n('offline.indicator'),

    connectStyle('offline.indicator.other'),

)(OtherOfflineIndicatorView);