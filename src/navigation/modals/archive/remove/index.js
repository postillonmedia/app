import { compose } from 'recompose';
import { connect } from 'react-redux';
import { i18n } from '@postillon/react-native-i18n';
import { ThemeManager, connectStyle } from '@postillon/react-native-theme';

import { Themes } from './../../../../constants/themes';
import styles from './styles';

import { removeArticleFromArchive } from '../../../../redux/actions/article';

import RemoveFromArchiveView from './RemoveFromArchiveView';


ThemeManager.addStyleSheet(styles.darkStyles, 'modal.archive.remove', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'modal.archive.remove', Themes.DEFAULT);


const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    removeArticleFromArchive: (id) => dispatch(removeArticleFromArchive(id)),
});

export default compose(
    i18n('modal.archive.remove'),
    connectStyle('modal.archive.remove'),
    connect(mapStateToProps, mapDispatchToProps)
)(RemoveFromArchiveView);