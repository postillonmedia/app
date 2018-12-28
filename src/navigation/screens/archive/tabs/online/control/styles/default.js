/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet } from 'react-native';

import { DefaultTheme } from '../../../../../../../constants/themes';

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,

        elevation: 1,

        flexDirection: 'row',
        alignItems: 'center',

        backgroundColor: DefaultTheme.colors.bg.lightest,
    },

    list: {
        flex: 1,
    },

    switch: {
        justifyContent: 'center',
        alignItems: 'center',

        minWidth: '20%',
        margin: 10,
        padding: 5,

        borderWidth: 0,
        borderColor: DefaultTheme.colors.border,
    },

    item: {
        justifyContent: 'center',
        alignItems: 'center',

        margin: 10,
        padding: 5,
    },

    selected: {
        color: DefaultTheme.colors.text.highlighted,
        fontFamily: 'FiraSans-SemiBold',
    },

    text: DefaultTheme.styles.text.ui,









    // container: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    //
    // svg: {
    //     flex: 1,
    // },
    //
    // text: {
    //     ...DefaultTheme.styles.text.ui,
    //
    //     color: DefaultTheme.colors.text.secondary,
    //     fontSize: 18,
    // }
});

export default styles;