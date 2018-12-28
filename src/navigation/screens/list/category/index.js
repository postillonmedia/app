import {i18n} from '@postillon/react-native-i18n';

import ListScreenView from './..';


const CategoryListScreen = i18n('articlesList')(ListScreenView);


// set static navigator styles
CategoryListScreen.navigatorStyle = {
    backButtonHidden: true,
    navBarHideOnScroll: true,
};


export default CategoryListScreen;