/**
 * Created by DanielL on 26.11.2017.
 */

import { DefaultTheme, DarkTheme } from './../../../constants/themes';


export const defaults = {
    statusBar: {
        visible: true,
        style: 'dark',

        // android
        backgroundColor: DefaultTheme.colors.tabs.background,
    },

    layout: {
        backgroundColor: DefaultTheme.colors.bg.lighter,

        // android
        componentBackgroundColor: DefaultTheme.colors.bg.lighter,
    },

    topBar: {
        leftButtonColor: DefaultTheme.colors.tabs.button,
        rightButtonColor: DefaultTheme.colors.tabs.button,

        backButton: {
            // android
            color: DefaultTheme.colors.tabs.button,
        },

        title: {
            color: DefaultTheme.colors.text.primary,
            fontFamily: 'FiraSans-SemiBold',
        },
        subtitle: {
            color: DefaultTheme.colors.text.primary,
            fontFamily: 'FiraSans-Regular',
        },
        background: {
            color: DefaultTheme.colors.tabs.background,
        }
    },

    navigationBar: {
        backgroundColor: DefaultTheme.colors.tabs.background,
    },

    bottomTabs: {
        animate: true,
        drawBehind: false,
        backgroundColor: DefaultTheme.colors.tabs.background,

        // android
        titleDisplayMode: 'alwaysShow',
    },

    bottomTab: {
        badgeColor: DefaultTheme.colors.brandPrimary,
        iconColor: DefaultTheme.colors.tabs.button,
        textColor: DefaultTheme.colors.tabs.button,
        selectedIconColor: DefaultTheme.colors.tabs.selectedButton,
        selectedTextColor: DefaultTheme.colors.tabs.selectedButton,
        fontFamily: 'FiraSans-Regular',
        fontSize: 10,
    },
};

export const article = {
    ...defaults,

    layout: {
        ...defaults.layout,

        backgroundColor: DefaultTheme.colors.bg.lightest,

        // android
        componentBackgroundColor: DefaultTheme.colors.bg.lightest,
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
