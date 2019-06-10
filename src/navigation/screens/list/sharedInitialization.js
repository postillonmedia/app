import { connect } from 'react-redux';
import { ThemeManager, connectStyle } from '@postillon/react-native-theme';

import { Themes } from '../../../constants/themes';
import { getBlogByLanguage } from '../../../constants/blogs';

import styles from './styles';

import * as PageActions from '../../../redux/actions/pages';
import * as ArticleActions from '../../../redux/actions/article';
import { getWindowWidth, getIsConnected, getTopBarHeight } from '../../../redux/selectors/environment';
import { getPageByBlogAndCategory } from '../../../redux/selectors/pages';


ThemeManager.addStyleSheet(styles.darkStyles, 'screen.list', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'screen.list', Themes.DEFAULT);


export const mapStateToProps = (state, ownProps) => {
    const { category, locale } = ownProps;

    const blogId = getBlogByLanguage(locale);

    return {
        blogId,

        page: getPageByBlogAndCategory(state, blogId, category),

        width: getWindowWidth(state),
        topBarHeight: getTopBarHeight(state),
        isConnected: getIsConnected(state),
    };
};

export const mapDispatchToProps = dispatch => ({
    initializeCategory: (blogId, category) => dispatch(PageActions.initialize(blogId, category)),
    reloadCategory: (blogId, category) => dispatch(PageActions.reload(blogId, category)),
    endReached: (blogId, category) => dispatch(PageActions.endReached(blogId, category)),

    removeArticleFromArchive: (id) => dispatch(ArticleActions.removeArticleFromArchive(id)),
});


export default () => (ListScreen) => {
    console.warn(typeof ListScreen);

    return connect(mapStateToProps, mapDispatchToProps)(ListScreen);
};