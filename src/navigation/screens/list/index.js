import { compose } from 'recompose';
import { connect } from 'react-redux';
import { ThemeManager, connectStyle } from '@postillon/react-native-theme';

import { Themes } from '../../../constants/themes';
import { getBlogByLanguage } from '../../../constants/blogs';

import { iconsMap } from '../../../app-icons';
import styles from './styles';

import * as PageActions from '../../../redux/actions/pages';
import * as ArticleActions from '../../../redux/actions/article';
import { getWindowWidth, getIsConnected } from '../../../redux/selectors/environment';
import { getPageByBlogAndCategory } from '../../../redux/selectors/pages';

import ListScreenView from './ListScreen';


ThemeManager.addStyleSheet(styles.darkStyles, 'screen.list', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'screen.list', Themes.DEFAULT);


const mapStateToProps = (state, ownProps) => {
    const { category, locale } = ownProps;

    const blogId = getBlogByLanguage(locale);

    return {
        blogId,
        width: getWindowWidth(state),
        page: getPageByBlogAndCategory(state, blogId, category),

        isConnected: getIsConnected(state),
    };
};

const mapDispatchToProps = dispatch => ({
    initializeCategory: (blogId, category) => dispatch(PageActions.initialize(blogId, category)),
    reloadCategory: (blogId, category) => dispatch(PageActions.reload(blogId, category)),
    endReached: (blogId, category) => dispatch(PageActions.endReached(blogId, category)),

    removeArticleFromArchive: (id) => dispatch(ArticleActions.removeArticleFromArchive(id)),
});


const ListScreen = compose(

    connectStyle('screen.list', {
        callback: (theme, props) => {
            const { defaults: style } = ThemeManager.getStyleSheetForComponent('screens', theme);
            const constants = ThemeManager.getConstantsForTheme(theme);

            const { navigator } = props;

            navigator.setStyle(style);

            navigator.setButtons({
                rightButtons: [
                    {
                        icon: iconsMap['search'],
                        id: 'search', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
                        testID: 'e2e_rules', // optional, used to locate this view in end-to-end tests
                        showAsAction: 'always', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
                        buttonColor: constants.colors.text.primary, // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
                        buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
                        buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
                    }
                ],
                animated: false // does the change have transition animation or does it happen immediately (optional)
            });
        }
    }),

    connect(mapStateToProps, mapDispatchToProps),

)(ListScreenView);


// export ListScreen as default
export default ListScreen;