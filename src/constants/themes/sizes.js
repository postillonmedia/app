/**
 * App Theme - Fonts
 *
 * Created by DanielL on 15.06.2017.
 */

import {Dimensions, PixelRatio, Platform} from 'react-native';


const { width, height } = Dimensions.get('window');
const screenHeight = width < height ? height : width;
const screenWidth = width < height ? width : height;

const pixelRatio = PixelRatio.get();


export const normalize = size => {
    if (pixelRatio >= 2 && pixelRatio < 3) {
        // iphone 5s and older Androids
        if (screenWidth < 360) {
            return size * 0.95;
        }
        // iphone 5
        if (screenHeight < 667) {
            return size;
            // iphone 6-6s
        } else if (screenHeight >= 667 && screenHeight <= 735) {
            return size * 1.15;
        }
        // older phablets
        return size * 1.25;
    } else if (pixelRatio >= 3 && pixelRatio < 3.5) {
        // catch Android font scaling on small machines
        // where pixel ratio / font scale ratio => 3:3
        if (screenWidth <= 360) {
            return size;
        }
        // Catch other weird android width sizings
        if (screenHeight < 667) {
            return size * 1.15;
            // catch in-between size Androids and scale font up
            // a tad but not too much
        }
        if (screenHeight >= 667 && screenHeight <= 735) {
            return size * 1.2;
        }
        // catch larger devices
        // ie iphone 6s plus / 7 plus / mi note 等等
        return size * 1.27;
    } else if (pixelRatio >= 3.5) {
        // catch Android font scaling on small machines
        // where pixel ratio / font scale ratio => 3:3
        if (screenWidth <= 360) {
            return size;
            // Catch other smaller android height sizings
        }
        if (screenHeight < 667) {
            return size * 1.2;
            // catch in-between size Androids and scale font up
            // a tad but not too much
        }
        if (screenHeight >= 667 && screenHeight <= 735) {
            return size * 1.25;
        }
        // catch larger phablet devices
        return size * 1.4;
    } else {
        // if older device ie pixelRatio !== 2 || 3 || 3.5
        return size;
    }
};

export default {
    // Window Dimensions
    screen: {
        height: screenHeight,
        width: screenWidth,

        widthHalf: screenWidth * 0.5,
        widthThird: screenWidth * 0.333,
        widthTwoThirds: screenWidth * 0.666,
        widthQuarter: screenWidth * 0.25,
        widthThreeQuarters: screenWidth * 0.75,
    },

    statusBarHeight: Platform.OS === 'ios' ? 16 : 0,

    font: {
        small: normalize(12),
        medium: normalize(15),
        large: normalize(18),
        xlarge: normalize(20),
        xxlarge: normalize(22),
        xxxlarge: normalize(24),
    },
};
