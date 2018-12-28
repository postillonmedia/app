import { compose } from 'recompose';
import { connectStyle } from '@postillon/react-native-theme';
import { i18n } from '@postillon/react-native-i18n';

import RecommendationsView from './RecommendationsView';


export default compose(

    i18n('article'),

    connectStyle('article'),

)(RecommendationsView);