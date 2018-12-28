/**
 * Created by DanielL on 26.11.2017.
 */

import { DefaultTheme, DarkTheme } from './../../../constants/themes';


export const defaults = {
    tabBarButtonColor: DefaultTheme.colors.tabs.button,
    tabBarSelectedButtonColor: DefaultTheme.colors.tabs.selectedButton,
    tabBarBackgroundColor: DefaultTheme.colors.tabs.background,
    tabFontFamily: 'FiraSans-Regular',
    forceTitlesDisplay: true,

    navBarTextColor: DefaultTheme.colors.text.primary,
    navBarButtonColor: DefaultTheme.colors.text.primary,
    navBarBackgroundColor: DefaultTheme.colors.tabs.background,
    navBarNoBorder: true,
    topBarElevationShadowEnabled: true,

    statusBarTextColorScheme: 'dark',

    screenBackgroundColor: DefaultTheme.colors.bg.lighter,

    // android only
    statusBarColor: DefaultTheme.colors.tabs.background,
    navigationBarColor: DarkTheme.colors.tabs.background,

    // iOS only
    keepStyleAcrossPush: true,
    statusBarHideWithNavBar: true,
};

export const article = {
    ...defaults,

    screenBackgroundColor: DefaultTheme.colors.bg.lightest,
};

export const search = {
    ...defaults,

    topBarElevationShadowEnabled: false,
};



export default {
    defaults,
    article,
    search,
};