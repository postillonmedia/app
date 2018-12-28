import { compose } from 'recompose';
import { connect } from 'react-redux';
import { connectStyle, ThemeManager } from '@postillon/react-native-theme';
import { i18n } from '@postillon/react-native-i18n';

import { Themes } from '../../../../../../constants/themes';
import styles from './styles';

import { setMonth, setSelector, setYearAndSelectMonth } from '../../../../../../redux/actions/archive';
import { getMonth, getSelector, getYear } from '../../../../../../redux/selectors/archive';

import OnlineArchiveControlView from './OnlineArchiveControlView';


ThemeManager.addStyleSheet(styles.darkStyles, 'screen.archive.online.control', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'screen.archive.online.control', Themes.DEFAULT);


const mapStateToProps = (state, ownProps) => ({
    year: getYear(state),
    month: getMonth(state),
    selector: getSelector(state),
});

const mapDispatchToProps = dispatch => ({
    setSelector: state => dispatch(setSelector(state)),
    setMonth: month => dispatch(setMonth(month)),
    setYearAndSelectMonth: year => dispatch(setYearAndSelectMonth(year)),
});


export default compose(

    i18n('archive'),

    connectStyle('screen.archive.online.control'),

    connect(mapStateToProps, mapDispatchToProps),

)(OnlineArchiveControlView);