/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet } from 'react-native';

import { DarkTheme } from '../../../../../constants/themes';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    line: {
        margin: 16,
        marginBottom: 0,
        paddingVertical: 13,
        paddingHorizontal: 16,
        minHeight: 54,

        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',

        borderRadius: 5,
        backgroundColor: DarkTheme.colors.bg.lighter,

        elevation: 1,
        shadowColor: DarkTheme.colors.shadow,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.4,
    },

    linetext: {
        flex: .8,

        ...DarkTheme.styles.text.ui,
        color: DarkTheme.colors.text.secondary,
        fontSize: 18,
    },

    content: {
        margin: 16
    },

    heading: {
        ...DarkTheme.styles.text.heading,

        fontSize: 16,
    },

    paragraph: {
        ...DarkTheme.styles.text.article,

        marginTop: 5,
        marginBottom: 10,
    },

    text: DarkTheme.styles.text.article,

    bold: {
        fontWeight: 'bold',
    },

    italic: {
        fontStyle: 'italic',
    },
});


export default styles;