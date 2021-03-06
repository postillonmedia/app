/**
 * Created by DanielL on 12.06.2017.
 */

import {StyleSheet, Platform} from 'react-native';

import {DarkTheme} from '../../../../../constants/themes';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: DarkTheme.colors.bg.lightest,
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
        ...DarkTheme.styles.text.modal,

        textAlign: 'center',
        lineHeight: 24,
        color: DarkTheme.colors.text.secondary,
    },

    heading: {
        ...DarkTheme.styles.text.heading,

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
        borderColor: DarkTheme.colors.borderLight,

        paddingHorizontal: 14,
        paddingVertical: 14,
        width: '100%',
    },

    buttonEmphasized: {
        backgroundColor: DarkTheme.colors.bg.light,
        borderWidth: 0,
        borderTopWidth: 0,
    },

    buttonIcon: {
        fontSize: 14,
        marginRight: 8,
        lineHeight: 20,
    },
    buttonText: {
        ...DarkTheme.styles.text.modal,

        color: DarkTheme.colors.text.light,
    },
    buttonTextSecondary: {
        color: DarkTheme.colors.text.highlighted,
    },
    buttonTextPrimary: {
        color: DarkTheme.colors.text.highlighted,
        fontFamily: 'FiraSans-Medium',
    },
    buttonDisabled: {
        backgroundColor: DarkTheme.colors.monochrome.dark3,
        borderWidth: 0,
    },
});

export default styles;