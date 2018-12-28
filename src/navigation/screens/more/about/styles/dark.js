import { StyleSheet } from 'react-native';

import { DarkTheme } from '../../../../../constants/themes';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    content: {
        marginHorizontal: 16,
        marginBottom: 16
    },

    heading: {
        marginTop: 24,
        marginBottom: 16,

        color: DarkTheme.colors.text.highlighted,
        fontFamily: 'FiraSans-Regular',
        fontSize: 12,
    },

    developer: {
        marginBottom: 6
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