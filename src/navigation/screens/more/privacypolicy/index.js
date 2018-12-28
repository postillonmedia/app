import { compose } from 'recompose';
import { connect } from 'react-redux';
import { ThemeManager, connectStyle } from '@postillon/react-native-theme';
import { i18n } from '@postillon/react-native-i18n';

import { Themes } from '../../../../constants/themes';
import styles from './styles';

import { setAnalytics } from '../../../../redux/actions/settings/app';
import { getAppAnalytics } from '../../../../redux/selectors/settings';

import PrivacyPolicyScreenView from './PrivacyPolicyScreen';


ThemeManager.addStyleSheet(styles.darkStyles, 'screen.more.privacypolicy', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'screen.more.privacypolicy', Themes.DEFAULT);


const mapStateToProps = state => ({
    analytics: getAppAnalytics(state),
});

const mapDispatchToProps = dispatch => ({
    setAnalyticsCollectionEnabled: enabled => dispatch(setAnalytics(enabled)),
});


const PrivacyPolicyScreen = compose(

    i18n('privacyPolicy', {
        callback: (locale, t, props) => {
            const { navigator } = props;

            navigator.setTitle({
                title: t('title'),
            });
        }
    }),

    connectStyle('screen.more.privacypolicy', {
        callback: (theme, props) => {
            const { defaults: style } = ThemeManager.getStyleSheetForComponent('screens', theme);
            const { navigator } = props;

            navigator.setStyle(style);
        }
    }),

    connect(mapStateToProps, mapDispatchToProps),

)(PrivacyPolicyScreenView);


// set static navigator styles
PrivacyPolicyScreen.navigatorStyle = {
    navBarHidden: false,
    navBarHideOnScroll: false,
};


// export PrivacyPolicyScreen as default
export default PrivacyPolicyScreen;