/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet } from 'react-native';
import { DefaultTheme } from '../../../constants/themes';


export const styles = StyleSheet.create({
    base: {
        fontSize: DefaultTheme.sizes.font.medium,
        fontFamily: 'PTSerif-Regular',
        color: DefaultTheme.colors.text.primary,
        backgroundColor: DefaultTheme.colors.text.background,
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
        fontSize: DefaultTheme.sizes.font.xxxlarge,
    },
    h2: {
        fontSize: DefaultTheme.sizes.font.xxlarge,
    },
    h3: {
        fontSize: DefaultTheme.sizes.font.xlarge,
    },
    h4: {
        fontSize: DefaultTheme.sizes.font.large,
    },
    h5: {
        fontSize: DefaultTheme.sizes.font.medium,
    },
});

export default styles;