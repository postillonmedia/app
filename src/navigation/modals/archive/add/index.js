import { compose } from 'recompose';
import { connect } from 'react-redux';
import { i18n } from '@postillon/react-native-i18n';
import { ThemeManager, connectStyle } from '@postillon/react-native-theme';

import { Themes } from './../../../../constants/themes';
import styles from './styles';

import { addArticleToArchiveWithPictures, addArticleToArchiveWithoutPictures } from '../../../../redux/actions/article';
import { getIsConnected } from '../../../../redux/selectors/environment';

import AddToArchiveView from './AddToArchiveView';


ThemeManager.addStyleSheet(styles.darkStyles, 'modal.archive.add', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'modal.archive.add', Themes.DEFAULT);


const mapStateToProps = state => ({
    isConnected: getIsConnected(state),
});

const mapDispatchToProps = dispatch => ({
    addArticleToArchiveWithPictures: (id) => dispatch(addArticleToArchiveWithPictures(id)),
    addArticleToArchiveWithoutPictures: (id) => dispatch(addArticleToArchiveWithoutPictures(id)),
});

export default compose(
    i18n('modal.archive.add'),
    connectStyle('modal.archive.add'),
    connect(mapStateToProps, mapDispatchToProps),
)(AddToArchiveView);