/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet } from 'react-native';

import { DefaultTheme } from './../../../../constants/themes';


export const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,

        height: 50,

        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        ...DefaultTheme.styles.text.article,

        color: DefaultTheme.colors.text.negative,
        fontSize: 18,
    }

});

export default styles;