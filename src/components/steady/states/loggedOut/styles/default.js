/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet } from 'react-native';

import { DefaultTheme} from '../../../../../constants/themes';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',

        justifyContent: 'center',
        alignItems: 'center',

        paddingVertical: 30,
        paddingHorizontal: 20,
    },

    locked: {
        backgroundColor: 'rgba(0,0,0,0)',
        color: DefaultTheme.colors.text.negative,
        fontSize: 20,
    },

    text: {
        ...DefaultTheme.styles.text.ui,
        color: DefaultTheme.colors.text.negative,
        fontSize: 20,

        paddingLeft: 25,
        paddingRight: 5,
    },
});

export default styles;