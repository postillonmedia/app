import { compose } from 'recompose';
import { connect } from 'react-redux';
import { i18n } from '@postillon/react-native-i18n';

import { getIsConnected } from '../../../redux/selectors/environment';

import OtherMediaContainerView from './OtherMediaContainerView';


const mapStateToProps = (state, ownProps) => ({
    isConnected: getIsConnected(state),
});


export default compose(

    i18n('imageContainer'),

    connect(mapStateToProps),

)(OtherMediaContainerView);