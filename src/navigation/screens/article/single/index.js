import { compose } from 'recompose';
import { connect } from 'react-redux';
import { ThemeManager, connectStyle } from '@postillon/react-native-theme';
import { i18n } from '@postillon/react-native-i18n';
import { copilot } from '@okgrow/react-native-copilot';
import { Navigation } from 'react-native-navigation';

import { Themes } from '../../../../constants/themes';
import styles from './styles';

import { getArticleFontSize, getArticleTutorial, getArticleDisplayBackButton } from '../../../../redux/selectors/settings';
import { isSubscribedToSteady } from '../../../../redux/selectors/steady';
import { getArticleById } from '../../../../redux/selectors/article';

import { openArticle } from '../../../../redux/actions/article';
import { setTutorial } from '../../../../redux/actions/settings/article';

import Tooltip from '../../../../components/copilot/tooltip';
import StepNumber from '../../../../components/copilot/stepnumber';

import SingleArticleScreenView from './SingleArticleScreen';


ThemeManager.addStyleSheet(styles.darkStyles, 'screen.article.single', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'screen.article.single', Themes.DEFAULT);


const mapStateToProps = (state, ownProps) => ({
    fontSize: getArticleFontSize(state),
    tutorial: getArticleTutorial(state),
    displayBackButton: getArticleDisplayBackButton(state),

    articleState: getArticleById(state, ownProps.articleId),

    isSubscribedToSteady: isSubscribedToSteady(state),
});

const mapDispatchToProps = dispatch => ({
    openArticle: articleId => dispatch(openArticle(articleId)),
    setTutorial: tutorial => dispatch(setTutorial(tutorial)),
});


const SingleArticleScreen = compose(

    i18n('article'),

    connectStyle('screen.article.single', {
        callback: (theme, props) => {
            const { componentId } = props;

            Navigation.mergeOptions(componentId, SingleArticleScreenView.options(props));
        }
    }),

    connect(mapStateToProps, mapDispatchToProps),

    copilot({
        overlay: 'svg',
        animated: true,
        tooltipComponent: Tooltip,
        stepNumberComponent: StepNumber,
        androidStatusBarVisible: true
    }),

)(SingleArticleScreenView);


// set static navigator styles
SingleArticleScreen.navigatorStyle = {
    navBarHidden: true,
    tabBarHidden: true,
};

// export CategoriesScreen as default
export default SingleArticleScreen;