/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet } from 'react-native';

import { DarkTheme } from '../../../../../constants/themes';


export const styles = StyleSheet.create({
    container: {
        flex: 1,

        paddingTop: 20,
        paddingBottom: 10,
        paddingHorizontal: 20,
    },

    heading: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    text: {
        ...DarkTheme.styles.text.ui,
        color: DarkTheme.colors.text.negative,

        paddingLeft: 5,
        paddingRight: 5,
    },

    bar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginTop: 20,
    },

    button: {
        padding: 5,
        borderRadius: 2,
        backgroundColor: DarkTheme.colors.bg.lighter,
    },
    buttonContent: {
        ...DarkTheme.styles.text.ui,
        color: DarkTheme.colors.text.highlighted,
    },
});

export default styles;