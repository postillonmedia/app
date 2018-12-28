/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet } from 'react-native';

import { DefaultTheme} from '../../../../../constants/themes';


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
        ...DefaultTheme.styles.text.ui,
        color: DefaultTheme.colors.text.negative,

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
        backgroundColor: DefaultTheme.colors.bg.lightest,
    },
    buttonContent: {
        ...DefaultTheme.styles.text.ui,
        color: DefaultTheme.colors.text.highlighted,
    },
});

export default styles;