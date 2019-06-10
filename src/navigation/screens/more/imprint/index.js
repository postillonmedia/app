import { compose } from 'recompose';
import { ThemeManager, connectStyle } from '@postillon/react-native-theme';
import { i18n } from '@postillon/react-native-i18n';
import { Navigation } from 'react-native-navigation';

import { Themes } from '../../../../constants/themes';
import styles from './styles';


import ImprintScreenView from './ImprintScreen';


ThemeManager.addStyleSheet(styles.darkStyles, 'screen.more.imprint', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'screen.more.imprint', Themes.DEFAULT);


const ImprintScreen = compose(

    i18n('imprint'),

    connectStyle('screen.more.imprint', {
        callback: (theme, props) => {
            const { componentId } = props;

            Navigation.mergeOptions(componentId, ImprintScreenView.options(props));
        }
    }),

)(ImprintScreenView);


// set static navigator styles
ImprintScreen.navigatorStyle = {
    navBarHidden: false,
    navBarHideOnScroll: false,
};


// export ImprintScreen as default
export default ImprintScreen;