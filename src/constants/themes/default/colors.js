/**
 * Created by DanielL on 15.06.2017.
 */

// lightest hat immer den geringsten kontrast zur ThemeFarbe

// CONSTANT COLORS, same in both themes
const colors = {
    
   brandPrimary: '#ff6c33',
   brandSecondary: '#ff5131',
   brandLight: '#ff8355',
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
        highlighted: [colors.brandPrimary,colors.brandSecondary],
        highlightedInverse: [colors.brandSecondary,colors.brandPrimary],
    },
};

const bg = {
    bg: {
        light: colors.monochrome.white1,
        lighter: colors.monochrome.white2,
        lightest: colors.monochrome.white4,  
    },
};

const text = {
    text: {
        background: colors.monochrome.transparent,

        primary: colors.monochrome.dark1,
        secondary: colors.monochrome.dark4,

        
        highlighted: colors.brandPrimary,

        light: colors.monochrome.light1,
        lighter: colors.monochrome.light2,
        lightest: colors.monochrome.light3,
        
        negative: colors.monochrome.white4,
        paypal: colors.monochrome.white4,
    },
};

const tabs = {
    tabs: {
        button: colors.monochrome.dark1,
        selectedButton: colors.brandPrimary,
        background: colors.monochrome.white4,
    },
};

const switches = {
    switches: {
        tintColor: colors.monochrome.light1,
        onTintColor: colors.brandLight,
        thumbTintColor: colors.brandPrimary,
        
        // custom scripted colors
        offThumbTintColor: colors.monochrome.dark5,
        tintColorDisabled: colors.monochrome.light2,
        thumbTintColorDisabled: colors.monochrome.light2,
    },
};

const toasts = {
    toasts: {
        color: colors.monochrome.white4,
        backgroundColor: colors.monochrome.dark1,
    }
};

const popover = {
    popover: {
        backgroundColor: colors.monochrome.white3,
    }
};

const borders = {
    border: colors.monochrome.light1,
    borderLight: colors.monochrome.light3,
};

const shadows = {
    shadow: colors.monochrome.black,
};

const refreshControl = {
    refreshControl: {
        background: colors.monochrome.light3,
        colors: [colors.brandPrimary],
        tintColor: colors.brandPrimary,
    },
};

const notifier = {
    notifier: {
        info: colors.monochrome.black,
        error: colors.warning,
    },
};

const activityIndicator = {
    activityIndicator: colors.brandPrimary,
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
    ...activityIndicator
};