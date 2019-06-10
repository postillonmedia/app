import { compose } from 'recompose';
import { connect } from 'react-redux';
import { ThemeManager, connectStyle } from '@postillon/react-native-theme';
import { i18n } from '@postillon/react-native-i18n';
import { Navigation } from 'react-native-navigation';

import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import { Themes } from '../../../constants/themes';
import styles from './styles';

import { getWindowWidth } from '../../../redux/selectors/environment';

import ArchiveScreenView from './ArchiveScreen';


ThemeManager.addStyleSheet(styles.darkStyles, 'screen.archive', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'screen.archive', Themes.DEFAULT);


const mapStateToProps = state => ({
    width: getWindowWidth(state),
});


const ArchiveScreen = compose(

    i18n('archive', {
        callback: (locale, t, props) => {
            const { componentId } = props;

            Navigation.mergeOptions(componentId, {
                bottomTab: {
                    text: t('title'),
                }
            });
        }
    }),

    connectStyle('screen.archive', {
        callback: (theme, props) => {
            const { defaults: style } = ThemeManager.getStyleSheetForComponent('screens', theme);
            const { componentId } = props;

            Navigation.mergeOptions(componentId, ArchiveScreenView.options(props));
        }
    }),

    connect(mapStateToProps),

)(ArchiveScreenView);


// set static navigator styles
ArchiveScreen.navigatorStyle = {
    navBarHidden: true,
    navBarHideOnScroll: false,
};


// export ArchiveScreen as default
export default gestureHandlerRootHOC(ArchiveScreen);