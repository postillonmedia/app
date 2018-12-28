import { compose } from 'recompose';
import { connect } from 'react-redux';

import { i18n } from '@postillon/react-native-i18n';
import { ThemeManager, connectStyle } from '@postillon/react-native-theme';

import { Themes } from './../../../constants/themes';
import styles from './styles';

import { getIsConnected } from '../../../redux/selectors/environment';

import ImageContainerView from './ImageContainerView';


ThemeManager.addStyleSheet(styles.darkStyles, 'imageContainer', Themes.DARK);
ThemeManager.addStyleSheet(styles.defaultStyles, 'imageContainer', Themes.DEFAULT);


const mapStateToProps = (state, ownProps) => ({
    isConnected: getIsConnected(state),
});


export default compose(

    i18n('imageContainer'),

    connectStyle('imageContainer'),

    connect(mapStateToProps),

)(ImageContainerView);