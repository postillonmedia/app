/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet } from 'react-native';

import { DarkTheme } from './../../../../../../constants/themes';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    heading: {
        ...DarkTheme.styles.text.heading,
        paddingBottom: 5,
    },
    text: DarkTheme.styles.text.ui,

    emptyListContainer: {
        marginTop: 200,

        justifyContent: 'center',
        alignItems: 'center',
    },

    header: {
        alignSelf: 'center',

        marginTop: 15,
        padding: 5,

        backgroundColor: DarkTheme.colors.bg.lightest,
        borderRadius: 5
    },

    headertext: {
        ...DarkTheme.styles.text.ui,
        color: DarkTheme.colors.text.negative,
    },

    footer: {
        height: 70,
    }
});

export default styles;