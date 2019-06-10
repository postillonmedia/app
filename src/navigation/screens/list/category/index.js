import { compose } from 'recompose';
import { connect } from 'react-redux';
import { connectStyle } from '@postillon/react-native-theme';
import { i18n } from '@postillon/react-native-i18n';
import { Navigation } from 'react-native-navigation';

import sharedInitialization, { mapStateToProps, mapDispatchToProps } from '../sharedInitialization';
import CategoryArticleListScreenView from './CategoryArticleListScreen';


const CategoryArticleListScreen = compose(

    i18n('articlesList'),

    connectStyle('screen.list', {
        callback: (theme, props) => {
            const { componentId } = props;

            Navigation.mergeOptions(componentId, CategoryArticleListScreenView.options(props));
        }
    }),

    connect(mapStateToProps, mapDispatchToProps),

)(CategoryArticleListScreenView);


export default CategoryArticleListScreen;