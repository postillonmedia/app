/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet } from 'react-native';

import { DarkTheme } from '../../../../constants/themes';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',

        backgroundColor: DarkTheme.colors.monochrome.dark3,

        padding: 35,
    },

    divider: {
        height: 5,

        backgroundColor: DarkTheme.colors.border,
    },

    text: {
        ...DarkTheme.styles.text.ui,

        textAlign: 'center',
        color: DarkTheme.colors.text.primary,
        fontSize: 18,
        fontWeight: 'bold',

        marginVertical: 10,
    },
});

export default styles;