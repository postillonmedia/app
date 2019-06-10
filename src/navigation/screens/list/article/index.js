import { compose } from 'recompose';
import { connect } from 'react-redux';
import { connectStyle, ThemeManager } from '@postillon/react-native-theme';
import { i18n } from '@postillon/react-native-i18n';
import { Navigation } from 'react-native-navigation';

import sharedInitialization, { mapStateToProps, mapDispatchToProps } from '../sharedInitialization';

import HomeArticleListScreenView from './HomeArticleListScreen';


const HomeArticleListScreen = compose(

    i18n('articlesList', {
        callback: (locale, t, props) => {
            const { componentId } = props;

            Navigation.mergeOptions(componentId, HomeArticleListScreenView.options(props));

            // Navigation.mergeOptions(componentId, {
            //     bottomTab: {
            //         text: t('title'),
            //     }
            // });
        }
    }),

    connectStyle('screen.list', {
        callback: (theme, props) => {
            const { componentId } = props;

            Navigation.mergeOptions(componentId, HomeArticleListScreenView.options(props));
        }
    }),

    connect(mapStateToProps, mapDispatchToProps),

)(HomeArticleListScreenView);


export default HomeArticleListScreen;