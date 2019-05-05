/**
 * Created by DanielL on 16.06.2017.
 */

import { compose } from 'recompose';
import { connect } from 'react-redux';

import { i18n } from '@postillon/react-native-i18n';
import { ThemeManager, connectStyle } from '@postillon/react-native-theme';

import { Themes } from '../../../../constants/themes/index';
import styles from './styles';

import { getArticleById } from '../../../../redux/selectors/article';
import { getListingDisplayArticleIntroduction } from '../../../../redux/selectors/settings';

import ArticleCardView from './ArticleCardView';


ThemeManager.addStyleSheet(styles.darkStyles, 'card.article.big', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'card.article.big', Themes.DEFAULT);


const mapStateToProps = (state, ownProps) => ({
    articleState: getArticleById(state, ownProps.article.id),
    displayArticleIntroduction: getListingDisplayArticleIntroduction(state),
});


export default compose(

    i18n('articlesCard'),

    connectStyle('card.article.big'),

    connect(mapStateToProps),

)(ArticleCardView);