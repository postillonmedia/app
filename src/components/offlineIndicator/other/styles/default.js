/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet } from 'react-native';

import { DefaultTheme } from '../../../../constants/themes';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',

        borderRadius: 5,
        backgroundColor: DefaultTheme.colors.monochrome.light3,

        padding: 35,
    },

    divider: {
        height: 5,

        backgroundColor: DefaultTheme.colors.border,
    },

    text: {
        ...DefaultTheme.styles.text.ui,

        textAlign: 'center',
        color: DefaultTheme.colors.text.primary,
        fontSize: 18,
        fontWeight: 'bold',

        marginVertical: 10,
    },
});

export default styles;