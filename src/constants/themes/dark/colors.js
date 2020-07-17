/**
 * Created by DanielL on 15.06.2017.
 */

// lightest hat immer den geringsten kontrast zur ThemeFarbe

// CONSTANT COLORS, same in both themes
const colors = {

   brandPrimary: '#ff6c33',
   brandSecondary: '#ff5131',
   brandLight: '#ff8355',
   brandLighter: '#ff9670',
   // brandLighter: '#ff956d',

   warning: '#cd2222',

   monochrome: {
        black: '#000000',

        dark1: '#222222',
        dark2: '#333333',
        dark3: '#555555',
        dark4: '#777777', // maybe not needed
        dark5: '#888888',

        light1: '#999999',
        light2: '#bbbbbb',
        light3: '#eeeeee',

        white1: '#bfbfbf',
        white2: '#efefef',
        white3: '#f5f5f5',
        white4: '#ffffff',

        transparent: 'transparent',
    },
};
// END CONSTANT COLORS, same in both themes


const gradient = {
    gradient: {
        highlighted: [colors.monochrome.dark3,colors.monochrome.dark3],
        highlightedInverse: [colors.monochrome.dark3,colors.monochrome.dark3],
    },
};

const bg = {
    bg: {
        light: colors.monochrome.dark3,
        lighter: colors.monochrome.dark2,
        lightest: colors.monochrome.dark1,
    },
};

const text = { // and Icons
    text: {
        background: colors.monochrome.transparent,

        primary: colors.monochrome.light3,
        secondary: colors.monochrome.white1,

        highlighted: colors.monochrome.light2,

        light: colors.monochrome.dark5,
        lighter: colors.monochrome.dark3,
        lightest: colors.monochrome.dark2,

        negative: colors.monochrome.white4,
        paypal: colors.monochrome.white4,
    },
};

const tabs = {
    tabs: {
        button: colors.monochrome.dark4,
        selectedButton: colors.monochrome.light2,
        background: colors.monochrome.dark2,
    },
};

const switches = {
    switches: {
        tintColor: colors.monochrome.dark4,
        onTintColor: colors.monochrome.light1,
        thumbTintColor: colors.monochrome.light2,

        // custom scripted colors
        offThumbTintColor: colors.monochrome.dark3,
        tintColorDisabled: colors.monochrome.dark2,
        thumbTintColorDisabled: colors.monochrome.dark1,
    },
};

const toasts = {
    toasts: {
        color: colors.monochrome.dark1,
        backgroundColor: colors.monochrome.white4,
    }
};

const popover = {
    popover: {
        backgroundColor: colors.monochrome.dark3,
    }
};

const borders = {
    border: colors.monochrome.dark4,
    borderLight: colors.monochrome.dark2,
};

const shadows = {
    shadow: colors.monochrome.black,
};

const refreshControl = {
    refreshControl: {
        tintColor: colors.monochrome.dark5,
        background: colors.monochrome.dark1,
        colors: [colors.monochrome.dark3],
    },
};

const notifier = {
    notifier: {
        info: colors.monochrome.black,
        error: colors.warning,
    },
};

const activityIndicator = {
    activityIndicator: colors.monochrome.light2,
};

export default {
    ...colors,
    ...gradient,
    ...bg,
    ...text,
    ...tabs,
    ...switches,
    ...toasts,
    ...popover,
    ...borders,
    ...shadows,
    ...refreshControl,
    ...notifier,
    ...activityIndicator,
};
