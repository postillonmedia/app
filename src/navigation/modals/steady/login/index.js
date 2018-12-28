import { compose } from 'recompose';
import { connect } from 'react-redux';
import { i18n } from '@postillon/react-native-i18n';
import { ThemeManager, connectStyle } from '@postillon/react-native-theme';

import { Themes } from './../../../../constants/themes';
import styles from './styles';

import { login, register } from './../../../../redux/actions/steady';

import SteadyLoginView from './SteadyLoginView';


ThemeManager.addStyleSheet(styles.darkStyles, 'modal.steady.login', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'modal.steady.login', Themes.DEFAULT);


const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
    login: () => dispatch(login()),
    register: () => dispatch(register()),
});

export default compose(
    i18n('modal.steady.login'),
    connectStyle('modal.steady.login'),
    connect(mapStateToProps, mapDispatchToProps),
)(SteadyLoginView);