/**
 * Created by DanielL on 18.06.2017.
 */

import { compose } from 'recompose';
import { ThemeManager, connectStyle } from '@postillon/react-native-theme';

import { Themes } from '../../constants/themes';
import styles from './styles';

import ContentView from './ContentView';


ThemeManager.addStyleSheet(styles.darkStyles, 'content', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'content', Themes.DEFAULT);


export default compose(

    connectStyle('content'),

)(ContentView);