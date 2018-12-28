import { compose } from 'recompose';
import { connect } from 'react-redux';
import { ThemeManager, connectStyle } from '@postillon/react-native-theme';
import { i18n } from '@postillon/react-native-i18n';

import { Themes } from './../../constants/themes';
import styles from './styles';

import { getSteadyError, getSteadySubscription, getSteadyUser } from '../../redux/selectors/steady';
import * as SteadyActions from '../../redux/actions/steady';

import SteadyView from './SteadyView';


ThemeManager.addStyleSheet(styles.darkStyles, 'steady', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'steady', Themes.DEFAULT);


const mapStateToProps = (state, ownProps) => ({
    user: getSteadyUser(state),
    subscription: getSteadySubscription(state),
    error: getSteadyError(state),
});

const mapDispatchToProps = dispatch => ({
    login: () => dispatch(SteadyActions.login()),
    logout: () => dispatch(SteadyActions.logout()),
});


export default compose(

    i18n('steady'),

    connectStyle('steady'),

    connect(mapStateToProps, mapDispatchToProps),

)(SteadyView);