/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet } from 'react-native';

import { DefaultTheme } from './../../../../../../constants/themes';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    spacer: {
        height: 16,
    },

    emptyListContainer: {
        flex: 1,

        margin: 40,

        justifyContent: 'center',
        alignItems: 'center',
    },

    svg: {},

    heading: {
        ...DefaultTheme.styles.text.heading,
        marginVertical: 15,
    },

    text: {
        ...DefaultTheme.styles.text.ui,

        textAlign: 'center',
    },
});

export default styles;