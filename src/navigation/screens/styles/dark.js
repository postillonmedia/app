/**
 * Created by DanielL on 26.11.2017.
 */

import { DefaultTheme, DarkTheme } from './../../../constants/themes';


export const defaults = {
    tabBarButtonColor: DarkTheme.colors.tabs.button,
    tabBarSelectedButtonColor: DarkTheme.colors.tabs.selectedButton,
    tabBarBackgroundColor: DarkTheme.colors.tabs.background,
    tabFontFamily: 'FiraSans-Regular',
    forceTitlesDisplay: true,

    navBarTextColor: DarkTheme.colors.text.secondary,
    navBarButtonColor: DarkTheme.colors.text.secondary,
    navBarBackgroundColor: DarkTheme.colors.tabs.background,
    navBarNoBorder: true,
    topBarElevationShadowEnabled: true,

    statusBarTextColorScheme: 'light',

    screenBackgroundColor: DarkTheme.colors.bg.lightest,

    // android only
    statusBarColor:  DarkTheme.colors.tabs.background, //'#000',
    navigationBarColor: '#000', // DarkTheme.colors.tabs.background,

    // iOS only
    keepStyleAcrossPush: true,
    statusBarHideWithNavBar: true,
};

export const article = {
    ...defaults,

    screenBackgroundColor: DarkTheme.colors.bg.lightest,
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