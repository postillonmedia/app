/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet } from 'react-native';

import { DefaultTheme } from './../../../../../../constants/themes';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    heading: {
        ...DefaultTheme.styles.text.heading,
        paddingBottom: 5,
    },
    text: DefaultTheme.styles.text.ui,

    emptyListContainer: {
        marginTop: 200,

        justifyContent: 'center',
        alignItems: 'center',
    },

    header: {
        alignSelf: 'center',

        marginTop: 15,
        padding: 5,

        backgroundColor: DefaultTheme.colors.bg.lighter,
        borderRadius: 5
    },

    headertext: {
        ...DefaultTheme.styles.text.ui,
        color: DefaultTheme.colors.text.secondary,
    },

    footer: {
        height: 70,
    }

});

export default styles;