/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet } from 'react-native';

import { DarkTheme } from '../../../../../../../constants/themes';

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,

        flexDirection: 'row',
        alignItems: 'center',

        backgroundColor: DarkTheme.colors.bg.lighter,
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
        borderColor: DarkTheme.colors.border,
    },

    item: {
        justifyContent: 'center',
        alignItems: 'center',

        margin: 10,
        padding: 5,
    },

    selected: {
        color: DarkTheme.colors.text.highlighted,
        fontFamily: 'FiraSans-SemiBold',
    },

    text: {
        ...DarkTheme.styles.text.ui,
        color: DarkTheme.colors.tabs.button,
    },

});

export default styles;