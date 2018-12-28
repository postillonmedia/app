/**
 * Created by DanielL on 11.04.2018.
 */

import {StyleSheet, Platform} from 'react-native';

import {DarkTheme, DefaultTheme} from '../../../../../constants/themes';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: DefaultTheme.colors.bg.lightest,
        borderRadius: 5,
        overflow: 'hidden',
    },

    texts: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 30,
        marginHorizontal: 20,

    },

    text: {
        ...DefaultTheme.styles.text.modal,

        textAlign: 'center',
        lineHeight: 24,
        color: DefaultTheme.colors.text.secondary,
    },

    heading: {
        ...DefaultTheme.styles.text.heading,

        marginBottom: 12,
    },

    buttons: {
        height: 'auto',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    button: {
        flexDirection: 'row',
        justifyContent: 'center',

        borderWidth: 0,
        borderTopWidth: 1,
        borderColor: DefaultTheme.colors.borderLight,

        paddingHorizontal: 14,
        paddingVertical: 14,
        width: '100%',
    },

    buttonEmphasized: {
        backgroundColor: DefaultTheme.colors.brandPrimary,
        borderWidth: 0,
    },

    buttonIcon: {
        fontSize: 14,
        marginRight: 8,
        lineHeight: 20,
    },
    buttonText: {
        ...DefaultTheme.styles.text.modal,

        color: DefaultTheme.colors.text.light,
    },
    buttonTextSecondary: {
        color: DefaultTheme.colors.text.highlighted,
    },
    buttonTextPrimary: {
        color: DefaultTheme.colors.text.negative,
        fontFamily: 'FiraSans-Medium',
    },
    buttonDisabled: {
        backgroundColor: DefaultTheme.colors.monochrome.dark3,
        borderWidth: 0,
    },
});

export default styles;