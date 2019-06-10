import { ThemeManager } from '@postillon/react-native-theme';

import merge from 'deepmerge';

import { Icons, getLocalizedString } from '../../../../App';
import { Themes } from '../../../../constants/themes';

import ListScreen from "../ListScreen";




export class HomeArticleListScreen extends ListScreen {

    static options(passProps) {
        const { theme = Themes.DEFAULT, locale } = passProps;
        const { defaults: screenStyle } = ThemeManager.getStyleSheetForComponent('screens', theme);

        return merge(screenStyle, {
            topBar: {
                visible: true,
                animate: true,
                hideOnScroll: true,
                drawBehind: true,

                backButton: undefined,

                title: {
                    text: getLocalizedString(locale, 'articlesList', 'appTitle'),

                    fontSize: 26,
                    fontFamily: 'CloisterBlack-Light',

                    alignment: 'center',
                },

                leftButtons: [
                    {
                        id: 'postillon',
                        // icon: Icons.postillon,
                        icon: {
                            uri: 'titlelarge'
                        },

                        disableIconTint: true,

                        // iOS
                        systemItem: 'refresh'
                    }
                ],
                rightButtons: [
                    {
                        id: 'search',
                        icon: Icons.search,

                        // iOS
                        systemItem: 'search'
                    }
                ],
            },

            bottomTab: {
                text: getLocalizedString(locale,'articlesList'),
                icon: Icons.home,
                testID: 'TAB_ARTICLES'
            }
        });
    }

}

export default HomeArticleListScreen;