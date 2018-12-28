import { compose } from 'recompose';
import { connect } from 'react-redux';
import { i18n } from '@postillon/react-native-i18n';
import { ThemeManager, connectStyle } from '@postillon/react-native-theme';

import { Themes } from './../../constants/themes';
import styles from './styles';

import { getIsConnected } from '../../redux/selectors/environment';

import InfoBarView from './InfoBarView';


ThemeManager.addStyleSheet(styles.darkStyles, 'infobar', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'infobar', Themes.DEFAULT);


const mapStateToProps = (state, ownProps) => ({
    isConnected: getIsConnected(state),
});

const mapDispatchToProps = dispatch => ({

});


export default compose(

    i18n('infobar'),

    connectStyle('infobar'),

    connect(mapStateToProps, mapDispatchToProps),

)(InfoBarView);