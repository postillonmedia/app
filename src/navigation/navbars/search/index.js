import { compose } from 'recompose';
import { connect } from 'react-redux';
import {connectStyle, ThemeManager} from '@postillon/react-native-theme';
import { i18n } from '@postillon/react-native-i18n';

import { Themes } from './../../../constants/themes';
import styles from './styles';

import * as SearchActions from '../../../redux/actions/search';

import SearchNavbarView from './SearchNavbar';


ThemeManager.addStyleSheet(styles.darkStyles, 'navbar.search', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'navbar.search', Themes.DEFAULT);


const mapStateToProps = (state, ownProps) => null;

const mapDispatchToProps = dispatch => ({
    submitSearch: (searchTerm) => dispatch(SearchActions.submit(searchTerm)),
});


const SearchNavbar = compose(
    i18n('search'),
    connectStyle('navbar.search'),
    connect(null, mapDispatchToProps)
)(SearchNavbarView);

// set static navigator styles
SearchNavbar.navigatorStyle = {
    navBarComponentAlignment: 'fill',
    navBarHidden: false,
    navBarHideOnScroll: false,
};

// export SearchNavbar as default
export default SearchNavbar;