import { ThemeManager } from '@postillon/react-native-theme';

import merge from 'deepmerge';

import { Icons } from '../../../../App';
import { Themes } from '../../../../constants/themes';

import ListScreen from "../ListScreen";


export class CategoryArticleListScreen extends ListScreen {

    static options(passProps) {
        const { theme = Themes.DEFAULT } = passProps;
        const { defaults: screenStyle } = ThemeManager.getStyleSheetForComponent('screens', theme);

        return merge(screenStyle, {
            topBar: {
                visible: true,
                animate: true,
                hideOnScroll: true,
                drawBehind: true,

                backButton: {
                    visible: true,
                },

                leftButtons: [],
                rightButtons: [
                    {
                        id: 'search',
                        icon: Icons.search,

                        // iOS
                        systemItem: 'search'
                    }
                ],
            }
        });
    }

}


export default CategoryArticleListScreen;