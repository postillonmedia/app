/**
 * Created by DanielL on 26.11.2017.
 */

import { DefaultTheme, DarkTheme } from './../../../constants/themes';


export const defaults = {
    statusBar: {
        visible: true,
        style: 'light',

        // android
        backgroundColor: DarkTheme.colors.tabs.background,
    },

    layout: {
        backgroundColor: DarkTheme.colors.bg.lightest,

        // android
        componentBackgroundColor: DarkTheme.colors.bg.lightest,
    },

    topBar: {
        leftButtonColor: DarkTheme.colors.tabs.button,
        rightButtonColor: DarkTheme.colors.tabs.button,
        backButton: {
            // android
            color: DarkTheme.colors.tabs.button,
        },

        title: {
            color: DarkTheme.colors.text.secondary,
            fontFamily: 'FiraSans-Regular',
        },
        subtitle: {
            color: DarkTheme.colors.text.secondary,
            fontFamily: 'FiraSans-Regular',
        },
        background: {
            color: DarkTheme.colors.tabs.background,
        }
    },

    navigationBar: {
        backgroundColor: DarkTheme.colors.tabs.background,
    },

    bottomTabs: {
        visible: true,
        animate: true,
        drawBehind: false,
        backgroundColor: DarkTheme.colors.tabs.background,

        // android
        titleDisplayMode: 'alwaysShow',
    },

    bottomTab: {
        badgeColor: DarkTheme.colors.brandPrimary,
        iconColor: DarkTheme.colors.tabs.button,
        textColor: DarkTheme.colors.tabs.button,
        selectedIconColor: DarkTheme.colors.tabs.selectedButton,
        selectedTextColor: DarkTheme.colors.tabs.selectedButton,
        fontFamily: 'FiraSans-Regular',
        fontSize: 10,
    },
};

export const article = {
    ...defaults,

    layout: {
        ...defaults.layout,

        backgroundColor: DarkTheme.colors.bg.lightest,

        // android
        componentBackgroundColor: DarkTheme.colors.bg.lightest,
    },
};

export const search = {
    ...defaults,

    // topBarElevationShadowEnabled: false,
};



export default {
    defaults,
    article,
    search,
};
