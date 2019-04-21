/**
 * Created by DanielL on 18.06.2017.
 */

import { compose } from 'recompose';
import { connect } from 'react-redux';
import { i18n } from '@postillon/react-native-i18n';
import { ThemeManager, connectStyle } from '@postillon/react-native-theme';

import { getWindowWidth } from '../../redux/selectors/environment';

import { Themes } from '../../constants/themes';
import styles from './native/styles';

import ContentView from './ContentView';


ThemeManager.addStyleSheet(styles.darkStyles, 'content', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'content', Themes.DEFAULT);


const mapStateToProps = (state, ownProps) => ({
    width: getWindowWidth(state),
});


export default compose(

    i18n('content'),

    connectStyle('content'),

    connect(mapStateToProps, null),

)(ContentView);