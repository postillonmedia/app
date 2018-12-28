/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet, Platform } from 'react-native';

import { DarkTheme } from '../../../../../constants/themes';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: DarkTheme.colors.bg.lightest,
        borderRadius: 5,
        overflow: 'hidden',
    },

    content: {
        marginTop: 25,
        marginBottom: 30,

        marginHorizontal: 20,
    },

    text: {
        ...DarkTheme.styles.text.modal,

        marginHorizontal: 5,

        textAlign: 'center',
        lineHeight: 24,
        color: DarkTheme.colors.text.secondary,
    },

    heading: {
        ...DarkTheme.styles.text.heading,
        alignSelf: 'center',

        marginBottom: 12,
    },

    section: {
        alignSelf: 'flex-start',

        marginTop: 10,

        color: DarkTheme.colors.text.highlighted,
        fontSize: 15,
        fontStyle: 'italic',
    },

    detail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',

        marginVertical: 2,
    },

    planDescription: {
        paddingTop: 0,
        marginTop: -4,
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

    buttonText: {
        ...DarkTheme.styles.text.modal,

        color: DarkTheme.colors.text.light,
    },
    buttonTextSecondary: {
        ...DarkTheme.styles.text.modal,

        color: DarkTheme.colors.text.highlighted,
    },
    buttonTextPrimary: {
        ...DarkTheme.styles.text.modal,

        color: DarkTheme.colors.text.negative,
        fontFamily: 'FiraSans-Medium',
    },
    buttonIconSecondary: {
        fontSize: 14,
        marginRight: 8,
        lineHeight: 20,
        color: DarkTheme.colors.text.highlighted,
    },
    buttonIconPrimary: {
        fontSize: 14,
        marginRight: 8,
        lineHeight: 20,
        color: DarkTheme.colors.text.negative,
    },
});

export default styles;