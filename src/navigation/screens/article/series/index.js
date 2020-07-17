import { compose } from 'recompose';
import { connect } from 'react-redux';
import { ThemeManager, connectStyle } from '@postillon/react-native-theme';
import { i18n } from '@postillon/react-native-i18n';
import { copilot } from 'react-native-copilot';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Navigation } from 'react-native-navigation';

import { Themes } from '../../../../constants/themes';
import styles from './styles';

import {
    getArticleFontSize,
    getArticleTutorial,
    getArticleDisplayBackButton,
} from '../../../../redux/selectors/settings';
import { isSubscribedToSteady } from '../../../../redux/selectors/steady';
import { getArticleById } from '../../../../redux/selectors/article';

import { openArticle } from '../../../../redux/actions/article';
import { setTutorial } from '../../../../redux/actions/settings/article';

import Tooltip from '../../../../components/copilot/tooltip';
import StepNumber from '../../../../components/copilot/stepnumber';
import SeriesArticleScreenView from './SeriesArticleScreen';
import { getWindowWidth } from '../../../../redux/selectors/environment';
import { getPageByBlogAndCategory } from '../../../../redux/selectors/pages';
import * as PageActions from '../../../../redux/actions/pages';

ThemeManager.addStyleSheet(
    styles.darkStyles,
    'screen.article.series',
    Themes.DARK,
);
ThemeManager.addStyleSheet(
    styles.defaultStyles,
    'screen.article.series',
    Themes.DEFAULT,
);

const mapStateToProps = (state, ownProps) => ({
    width: getWindowWidth(state),

    fontSize: getArticleFontSize(state),
    tutorial: getArticleTutorial(state),
    displayBackButton: getArticleDisplayBackButton(state),

    page: getPageByBlogAndCategory(state, ownProps.blogId, ownProps.category),
    articleState: getArticleById(state, ownProps.articleId),

    isSubscribedToSteady: isSubscribedToSteady(state),
});

const mapDispatchToProps = dispatch => ({
    openArticle: articleId => dispatch(openArticle(articleId)),
    endReached: (blogId, category) =>
        dispatch(PageActions.endReached(blogId, category)),
});

const SeriesArticleScreen = compose(
    i18n('article'),

    connectStyle('screen.article.series', {
        callback: (theme, props) => {
            const { componentId } = props;

            Navigation.mergeOptions(
                componentId,
                SeriesArticleScreenView.options(props),
            );
        },
    }),

    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),

    copilot({
        overlay: 'svg',
        animated: true,
        tooltipComponent: Tooltip,
        stepNumberComponent: StepNumber,
        androidStatusBarVisible: false,
    }),
)(SeriesArticleScreenView);

// export ArticlesScreen as default
export default gestureHandlerRootHOC(SeriesArticleScreen);
