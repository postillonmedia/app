import { compose } from 'recompose';
import { connect } from 'react-redux';
import { ThemeManager, connectStyle } from '@postillon/react-native-theme';
import { i18n } from '@postillon/react-native-i18n';

import { Themes } from '../../../../constants/themes';
import styles from './styles';

import { setLocale, setTheme, displayBackButton, setNotification } from '../../../../redux/actions/settings/app';
import { setFontSize, setDisplayBackButton, setTutorial } from '../../../../redux/actions/settings/article';
import {
    getAppNotifications,
    getArticleFontSize,
    getArticleDisplayBackButton,
    getArticleTutorial,
} from '../../../../redux/selectors/settings';

import SettingsScreenView from './SettingsScreen';


ThemeManager.addStyleSheet(styles.darkStyles, 'screen.more.settings', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'screen.more.settings', Themes.DEFAULT);


const mapStateToProps = state => ({
    fontSize: getArticleFontSize(state),
    tutorial: getArticleTutorial(state),
    displayBackButton: getArticleDisplayBackButton(state),

    notifications: getAppNotifications(state),
});

const mapDispatchToProps = dispatch => ({
    setLocale: locale => dispatch(setLocale(locale)),
    setTheme: theme => dispatch(setTheme(theme)),

    setFontSize: fontSize => dispatch(setFontSize(fontSize)),
    setTutorial: tutorial => dispatch(setTutorial(tutorial)),
    setDisplayBackButton: displayBackButton => dispatch(setDisplayBackButton(displayBackButton)),

    setNotification: enabled => dispatch(setNotification(enabled)),
});


const SettingsScreen = compose(

    i18n('settings', {
        callback: (locale, t, props) => {
            const { navigator } = props;

            navigator.setTitle({
                title: t('title'),
            });
        }
    }),

    connectStyle('screen.more.settings', {
        callback: (theme, props) => {
            const { defaults: style } = ThemeManager.getStyleSheetForComponent('screens', theme);
            const { navigator } = props;

            navigator.setStyle(style);
        }
    }),

    connect(mapStateToProps, mapDispatchToProps),

)(SettingsScreenView);


// set static navigator styles
SettingsScreen.navigatorStyle = {
    navBarHidden: false,
    navBarHideOnScroll: false,
};


// export SettingsScreen as default
export default SettingsScreen;