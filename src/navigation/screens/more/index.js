import { compose } from 'recompose';
import { ThemeManager, connectStyle } from '@postillon/react-native-theme';
import { i18n } from '@postillon/react-native-i18n';

import { Themes } from './../../../constants/themes';
import styles from './styles';

import MoreScreenView from './MoreScreen';


ThemeManager.addStyleSheet(styles.darkStyles, 'screen.more', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'screen.more', Themes.DEFAULT);


const MoreScreen = compose(

    i18n('more', {
        callback: (locale, t, props) => {
            const { navigator } = props;

            navigator.setTabButton({
                tabIndex: 3,
                label: t('title'),
            });
        }
    }),

    connectStyle('screen.more', {
        callback: (theme, props) => {
            const { defaults: style } = ThemeManager.getStyleSheetForComponent('screens', theme);
            const { navigator } = props;

            navigator.setStyle(style);
        }
    })

)(MoreScreenView);


// set static navigator styles
MoreScreen.navigatorStyle = {
    navBarHidden: true,
};


// export MoreScreen as default
export default MoreScreen;