import { compose } from 'recompose';
import { connect } from 'react-redux';
import { i18n } from '@postillon/react-native-i18n';
import { ThemeManager, connectStyle } from '@postillon/react-native-theme';

import { Themes } from './../../../../../constants/themes';
import styles from './styles';

import * as ArchiveActions from "../../../../../redux/actions/archive";
import { getContent } from "../../../../../redux/selectors/archive";

import OnlineArchiveView from './OnlineArchiveView';


ThemeManager.addStyleSheet(styles.darkStyles, 'screen.archive.online', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'screen.archive.online', Themes.DEFAULT);


const mapStateToProps = (state, ownProps) => ({
    content: getContent(state),
});

const mapDispatchToProps = dispatch => ({
    initialize: () => dispatch(ArchiveActions.initialize()),
    reload: () => dispatch(ArchiveActions.reload()),
});


export default compose(

    i18n('archive'),

    connectStyle('screen.archive.online'),

    connect(mapStateToProps, mapDispatchToProps),

)(OnlineArchiveView);