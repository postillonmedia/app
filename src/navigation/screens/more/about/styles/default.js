import { StyleSheet } from 'react-native';

import { DefaultTheme } from '../../../../../constants/themes';


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

        color: DefaultTheme.colors.text.highlighted,
        fontFamily: 'FiraSans-Regular',
        fontSize: 12,
    },

    developer: {
        marginBottom: 6
    },

    text: DefaultTheme.styles.text.article,

    bold: {
        fontWeight: 'bold',
    },

    italic: {
        fontStyle: 'italic',
    },
});

export default styles;