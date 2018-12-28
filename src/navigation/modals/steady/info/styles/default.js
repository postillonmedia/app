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

    content: {
        marginTop: 25,
        marginBottom: 30,

        paddingHorizontal: 20,
    },

    text: {
        ...DefaultTheme.styles.text.modal,

        marginHorizontal: 5,

        textAlign: 'center',
        lineHeight: 24,
        color: DefaultTheme.colors.text.secondary,
    },

    heading: {
        ...DefaultTheme.styles.text.heading,
        alignSelf: 'center',

        marginBottom: 12,
    },

    section: {
        alignSelf: 'flex-start',

        marginTop: 10,

        color: DefaultTheme.colors.text.highlighted,
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
        color: DefaultTheme.colors.text.light,
        fontFamily: 'PTSans-Italic',
    },
    buttonTextSecondary: {
        color: DefaultTheme.colors.text.highlighted,
    },
    buttonTextPrimary: {
        color: DefaultTheme.colors.text.negative,
        //  paddingHorizontal: 14,
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