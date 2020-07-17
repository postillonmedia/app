import { Platform } from 'react-native';
import { ThemeManager } from '@postillon/react-native-theme';

import merge from 'deepmerge';

import { Icons, getLocalizedString } from '../../../../App';
import { Themes } from '../../../../constants/themes';

import ListScreen from '../ListScreen';

export class HomeArticleListScreen extends ListScreen {
    static options(passProps) {
        const { theme = Themes.DEFAULT, locale } = passProps;
        const { defaults: screenStyle } = ThemeManager.getStyleSheetForComponent('screens', theme);

        return merge(screenStyle, {
            topBar: {
                visible: true,
                animate: true,
                hideOnScroll: true,
                drawBehind: Platform.OS !== 'ios',

                backButton: undefined,

                title: {
                    text: getLocalizedString(
                        locale,
                        'articlesList',
                        'appTitle',
                    ),

                    fontSize: 26,
                    fontFamily: 'CloisterBlack-Light',

                    alignment: 'center',
                },

                leftButtons: [
                    {
                        id: 'postillon',
                        icon: Icons.postillon,
                        text: 'Back',

                        disableIconTint: true,

                        // iOS
                        systemItem: 'refresh',

                        //color: screenStyle.topBar.leftButtonColor,
                    },
                ],
                rightButtons: [
                    {
                        id: 'search',
                        icon: Icons.search,

                        // iOS
                        systemItem: 'search',
                        color: screenStyle.topBar.rightButtonColor,
                    },
                ],
            },

            bottomTab: {
                text: getLocalizedString(locale, 'articlesList'),
                icon: Icons.home,
                testID: 'TAB_ARTICLES',
            },
        });
    }
}

export default HomeArticleListScreen;
