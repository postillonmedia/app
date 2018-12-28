/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet } from 'react-native';
import { DarkTheme } from '../../../constants/themes';


export const styles = StyleSheet.create({
    base: {
        fontSize: DarkTheme.sizes.font.medium,
        fontFamily: 'PTSerif-Regular',
        color: DarkTheme.colors.text.primary,
        backgroundColor: DarkTheme.colors.text.background,
    },

    bold: {
        fontFamily: 'PTSerif-Bold',
        // fontWeight: 'bold',
    },

    italic: {
        fontFamily: 'PTSerif-Italic',
        // fontStyle: 'italic',
    },

    h1: {
        fontSize: DarkTheme.sizes.font.xxxlarge,
    },
    h2: {
        fontSize: DarkTheme.sizes.font.xxlarge,
    },
    h3: {
        fontSize: DarkTheme.sizes.font.xlarge,
    },
    h4: {
        fontSize: DarkTheme.sizes.font.large,
    },
    h5: {
        fontSize: DarkTheme.sizes.font.medium,
    },
});

export default styles;