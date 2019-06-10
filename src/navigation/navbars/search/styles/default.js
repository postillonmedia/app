/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet, Platform } from 'react-native';

import { DefaultTheme } from '../../../../constants/themes';

export const styles = StyleSheet.create({
    navbar: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,

        width: 300,
    },

    textfiled: {
        flex: 1,
        fontSize: 20,

        color: DefaultTheme.colors.text.primary,
    }
});

export default styles;