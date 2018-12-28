/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet } from 'react-native';

import { DarkTheme } from '../../../../../constants/themes';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
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