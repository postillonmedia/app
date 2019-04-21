import { compose } from 'recompose';
import { connect } from 'react-redux';

import { getAppLocale, getAppTheme } from '../../selectors/settings';

import SettingsProvider from './SettingsProvider';


const mapStateToProps = (state, ownProps) => ({
    theme: getAppTheme(state),
    locale: getAppLocale(state),
});

const mapDispatchToProps = null;


export default compose(

    connect(mapStateToProps, mapDispatchToProps),

)(SettingsProvider);