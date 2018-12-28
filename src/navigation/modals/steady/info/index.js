import { compose } from 'recompose';
import { connect } from 'react-redux';
import { i18n } from '@postillon/react-native-i18n';
import { ThemeManager, connectStyle } from '@postillon/react-native-theme';

import { Themes } from './../../../../constants/themes';
import styles from './styles';

import { logout } from './../../../../redux/actions/steady';
import { getSteadySubscription, getSteadyUser } from '../../../../redux/selectors/steady';

import SteadyInfoView from './SteadyInfoView';


ThemeManager.addStyleSheet(styles.darkStyles, 'modal.steady.info', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'modal.steady.info', Themes.DEFAULT);


const mapStateToProps = state => ({
    user: getSteadyUser(state),
    subscription: getSteadySubscription(state),
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
});

export default compose(
    i18n('modal.steady.info'),
    connectStyle('modal.steady.info'),
    connect(mapStateToProps, mapDispatchToProps),
)(SteadyInfoView);