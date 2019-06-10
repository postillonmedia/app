import { compose } from 'recompose';
import { connect } from 'react-redux';
import { ThemeManager, connectStyle } from '@postillon/react-native-theme';
import { i18n } from '@postillon/react-native-i18n';
import { Navigation } from 'react-native-navigation';

import { Themes } from '../../../constants/themes';
import styles from './styles';

import {getWindowWidth} from '../../../redux/selectors/environment';

import CategoriesScreenView from './CategoriesScreen';


ThemeManager.addStyleSheet(styles.darkStyles, 'screen.categories', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'screen.categories', Themes.DEFAULT);


const mapStateToProps = state => ({
    width: getWindowWidth(state),
});


const CategoriesScreen = compose(

    i18n('categoriesList', {
        callback: (locale, t, props) => {
            const { componentId } = props;

            Navigation.mergeOptions(componentId, {
                bottomTab: {
                    text: t('title'),
                }
            });
        }
    }),

    connectStyle('screen.categories', {
        callback: (theme, props) => {
            const { componentId } = props;

            Navigation.mergeOptions(componentId, CategoriesScreenView.options(props));
        }
    }),

    connect(mapStateToProps)

)(CategoriesScreenView);


// set static navigator styles
CategoriesScreen.navigatorStyle = {
    navBarHidden: true,
    drawUnderNavBar: true,
    drawUnderTabBar: false,
};


// export CategoriesScreen as default
export default CategoriesScreen;