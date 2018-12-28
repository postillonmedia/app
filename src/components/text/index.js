import { compose } from 'recompose';
import { ThemeManager, connectStyle } from '@postillon/react-native-theme';

import { Themes } from './../../constants/themes';
import styles from './styles';

import TextView from './TextView';


ThemeManager.addStyleSheet(styles.darkStyles, 'text', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'text', Themes.DEFAULT);


export default compose(

    connectStyle('text')

)(TextView);