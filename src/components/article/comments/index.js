import { compose } from 'recompose';
import { connect } from 'react-redux';
import { connectStyle } from '@postillon/react-native-theme';
import { i18n } from '@postillon/react-native-i18n';

import { getWindowWidth } from '../../../redux/selectors/environment';
import { getArticleDisplayCommentsAlways } from '../../../redux/selectors/settings';


import CommentsView from './CommentsView';


const mapStateToProps = (state, ownProps) => ({
    width: getWindowWidth(state),
    displayCommentsAlways: getArticleDisplayCommentsAlways(state),
});


export default compose(

    i18n('article'),

    connectStyle('article'),

    connect(mapStateToProps, null),

)(CommentsView);