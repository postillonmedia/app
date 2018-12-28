import { compose } from 'recompose';
import { ThemeManager, connectStyle } from '@postillon/react-native-theme';
import { i18n } from '@postillon/react-native-i18n';

import { Themes } from '../../../constants/themes';
import styles from './styles';

import ImageOfflineIndicatorView from './ImageOfflineIndicatorView';


ThemeManager.addStyleSheet(styles.darkStyles, 'offline.indicator.image', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'offline.indicator.image', Themes.DEFAULT);


export default compose(

    i18n('offline.indicator'),

    connectStyle('offline.indicator.image'),

)(ImageOfflineIndicatorView);