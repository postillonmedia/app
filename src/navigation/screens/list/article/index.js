import {i18n} from '@postillon/react-native-i18n';

import ListScreenView from './..';


const ArticleListScreen = i18n('articlesList', {
    callback: (locale, t, props) => {
        const { navigator } = props;

        navigator.popToRoot({
            animated: false,
        });

        navigator.setTitle({
            title: t('appTitle'),
        });

        navigator.setTabButton({
            tabIndex: 0,
            label: t('title'),
        });
    }
})(ListScreenView);


// set static navigator styles
ArticleListScreen.navigatorStyle = {
    backButtonHidden: true,
    navBarHideOnScroll: true,

    navBarCustomView: 'postillon.navbars.Articles',
    navBarComponentAlignment: 'fill',
};


export default ArticleListScreen;