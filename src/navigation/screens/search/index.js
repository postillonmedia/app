import { compose } from 'recompose';
import { connect } from 'react-redux';
import { ThemeManager, connectStyle } from '@postillon/react-native-theme';
import { i18n } from '@postillon/react-native-i18n';
import { Navigation } from 'react-native-navigation';

import { Themes } from '../../../constants/themes';
import styles from './styles';



import { getIsSearching, getSearchCategory, getSearchPeriod, getSearchResults } from '../../../redux/selectors/search';
import * as SearchActions from '../../../redux/actions/search';

import SearchScreenView from './SearchScreen';


ThemeManager.addStyleSheet(styles.darkStyles, 'screen.search', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'screen.search', Themes.DEFAULT);


const mapStateToProps = (state, ownProps) => ({
    category: getSearchCategory(state),
    period: getSearchPeriod(state),

    results: getSearchResults(state),
    isSearching: getIsSearching(state)
});

const mapDispatchToProps = dispatch => ({
    initializeSearch: (blogId, category) => dispatch(SearchActions.initialize(blogId, category)),
    setSearchCategory: (category) => dispatch(SearchActions.setCategory(category)),
    setSearchPeriod: (period) => dispatch(SearchActions.setPeriod(period)),
    onEndReached: () => dispatch(SearchActions.endReached()),
});


const SearchScreen = compose(

    i18n('search'),

    connectStyle('screen.search', {
        callback: (theme, props) => {
            const { componentId } = props;

            Navigation.mergeOptions(componentId, SearchScreenView.options(props));

            // navigator.setButtons({
            //     rightButtons: [
            //         {
            //             icon: iconsMap['x'],
            //             id: 'search-close', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
            //             testID: 'e2e_rules', // optional, used to locate this view in end-to-end tests
            //             showAsAction: 'always', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
            //             buttonColor: constants.colors.text.primary, // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
            //             buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
            //             buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
            //         }
            //     ],
            //     animated: false // does the change have transition animation or does it happen immediately (optional)
            // });
        }
    }),

    connect(mapStateToProps, mapDispatchToProps)

)(SearchScreenView);


// set static navigator styles
SearchScreen.navigatorStyle = {
    navBarHidden: false,
    tabBarHidden: true,
    topBarElevationShadowEnabled: false,

    navBarCustomView: 'postillon.navbars.Search',
    navBarComponentAlignment: 'fill',
};


// export ArchiveScreen as default
export default SearchScreen;