import { compose } from 'recompose';
import { ThemeManager, connectStyle } from '@postillon/react-native-theme';
import { i18n } from '@postillon/react-native-i18n';
import { Navigation } from 'react-native-navigation';

import { Themes } from '../../../../constants/themes';
import styles from './styles';


import AboutScreenView from './AboutScreen';


ThemeManager.addStyleSheet(styles.darkStyles, 'screen.more.abaout', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'screen.more.abaout', Themes.DEFAULT);


const AboutScreen = compose(

    i18n('about'),

    connectStyle('screen.more.abaout', {
        callback: (theme, props) => {
            const { componentId } = props;

            Navigation.mergeOptions(componentId, AboutScreenView.options(props));
        }
    }),

)(AboutScreenView);


// set static navigator styles
AboutScreen.navigatorStyle = {
    navBarHidden: false,
    navBarHideOnScroll: false,
};


// export AboutScreen as default
export default AboutScreen;