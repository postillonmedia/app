import { compose } from 'recompose';
import { connect } from 'react-redux';
import { i18n } from '@postillon/react-native-i18n';
import { ThemeManager, connectStyle } from '@postillon/react-native-theme';

import { Themes } from './../../../../constants/themes';
import styles from './styles';

import { setTheme } from './../../../../redux/actions/settings/app';
import { setFontSize } from './../../../../redux/actions/settings/article';

import SettingsView from './SettingsView';


ThemeManager.addStyleSheet(styles.darkStyles, 'modal.article.settings', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'modal.article.settings', Themes.DEFAULT);


const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
    setTheme: theme => dispatch(setTheme(theme)),
    setFontSize: fontSize => dispatch(setFontSize(fontSize)),
});


export default compose(

    i18n('modal.article.settings'),

    connectStyle('modal.article.settings'),

    connect(mapStateToProps, mapDispatchToProps)

)(SettingsView);