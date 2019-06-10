/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet, Platform } from 'react-native';

import { DefaultTheme } from '../../../../../constants/themes/index';
import {DarkTheme} from "../../../../../constants/themes/index";

export const styles = StyleSheet.create({
    touchable: {
        flex: 1,
        height: 90,
        marginTop: 16,
        marginHorizontal: 16,
        padding: 0,
    },

    card: {
        flex: 1,
        flexDirection: 'row',
    },

    content: {
        width: '75%',
        flexDirection: 'row',
        alignItems: 'center',

        marginVertical: 5,
        padding: 5,
        paddingLeft: 10,

        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,

        backgroundColor: DefaultTheme.colors.bg.lightest,

        elevation: 1,
        shadowColor: DefaultTheme.colors.shadow,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.4,
    },

    fill: {
        width: '100%',

        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },

    image: {
        width: '25%',
        height: 90,

        borderRadius: 5,
    },

    title: {
        flex: 1,

        ...DefaultTheme.styles.text.heading,
        color: DefaultTheme.colors.text.primary,
        fontSize: 14,
    },

    button: {
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        margin: 5,

        borderLeftWidth: 2,
        borderColor: DefaultTheme.colors.borderLight,

        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default styles;