/**
 * Created by DanielL on 12.06.2017.
 */

import {StyleSheet, Platform} from 'react-native';

import {DefaultTheme} from '../../../../../constants/themes';

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
        marginBottom: 12,
        fontSize: 20,
        fontWeight: 'bold',
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

    buttonText: {
        ...DefaultTheme.styles.text.modal,

        color: DefaultTheme.colors.text.light,
    },
    buttonTextSecondary: {
        ...DefaultTheme.styles.text.modal,

        color: DefaultTheme.colors.text.highlighted,
    },
    buttonTextPrimary: {
        ...DefaultTheme.styles.text.modal,

        color: DefaultTheme.colors.text.negative,
        fontFamily: 'FiraSans-Medium',
    },
    buttonIconSecondary: {
        fontSize: 14,
        marginRight: 8,
        lineHeight: 20,
        color: DefaultTheme.colors.text.highlighted,
    },
    buttonIconPrimary: {
        fontSize: 14,
        marginRight: 8,
        lineHeight: 20,
        color: DefaultTheme.colors.text.negative,
    },
});

export default styles;