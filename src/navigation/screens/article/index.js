import { compose } from 'recompose';
import { connect } from 'react-redux';
import { ThemeManager, connectStyle } from '@postillon/react-native-theme';
import { i18n } from '@postillon/react-native-i18n';
import { copilot } from '@okgrow/react-native-copilot';

import { Themes } from '../../../constants/themes';
import { getBlogByLanguage } from '../../../constants/blogs';

import styles from './styles';

import { getArticleFontSize, getArticleTutorial, getArticleDisplayBackButton } from '../../../redux/selectors/settings';
import { isSubscribedToSteady } from '../../../redux/selectors/steady';
import { getArticleById } from '../../../redux/selectors/article';

import { openArticle } from '../../../redux/actions/article';
import { setTutorial } from '../../../redux/actions/settings/article';

import Tooltip from '../../../components/copilot/tooltip';
import StepNumber from '../../../components/copilot/stepnumber';

import ArticleScreenView from './ArticleScreen';
import {getPageByBlogAndCategory} from "../../../redux/selectors/pages";


ThemeManager.addStyleSheet(styles.darkStyles, 'screen.article', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'screen.article', Themes.DEFAULT);


const mapStateToProps = (state, ownProps) => {
    const { category, locale } = ownProps;

    const blogId = getBlogByLanguage(locale);

    return {
        blogId,

        fontSize: getArticleFontSize(state),
        tutorial: getArticleTutorial(state),
        displayBackButton: getArticleDisplayBackButton(state),

        page: getPageByBlogAndCategory(state, blogId, category),
        articleState: getArticleById(state, ownProps.articleId),

        isSubscribedToSteady: isSubscribedToSteady(state),
    };
};

const mapDispatchToProps = dispatch => ({
    openArticle: articleId => dispatch(openArticle(articleId)),
    setTutorial: tutorial => dispatch(setTutorial(tutorial)),
});


const ArticleScreen = compose(

    i18n('article'),

    connectStyle('screen.article', {
        callback: (theme, props) => {
            const { article: style } = ThemeManager.getStyleSheetForComponent('screens', theme);

            const { navigator } = props;

            navigator.setStyle(style);
        }
    }),

    connect(mapStateToProps, mapDispatchToProps),

    copilot({
        overlay: 'svg',
        animated: true,
        tooltipComponent: Tooltip,
        stepNumberComponent: StepNumber,
        androidStatusBarVisible: false
    }),

)(ArticleScreenView);


// set static navigator styles
ArticleScreen.navigatorStyle = {
    navBarHidden: true,
    tabBarHidden: true,
};

// export CategoriesScreen as default
export default ArticleScreen;