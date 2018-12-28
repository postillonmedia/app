/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet, Platform } from 'react-native';

import {DarkTheme, DefaultTheme} from '../../../../constants/themes';

export const styles = StyleSheet.create({
    navbar: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,

        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    image: {
        width: 40,

        marginRight: 5,
    },

    title: {
        fontSize: 26,
        fontFamily: 'CloisterBlack-Light',

        color: DarkTheme.colors.text.primary,
    },
});

export default styles;