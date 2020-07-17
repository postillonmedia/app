/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet } from 'react-native';

import { DarkTheme } from '../../../../constants/themes';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',

        height: 200,

        backgroundColor: DarkTheme.colors.monochrome.light3,
    },

    offlineRessourceImage: {
        alignSelf: 'center',

        height: 150,
    },

    offlineGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,

        height: 50,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,

        justifyContent: 'center',
        alignItems: 'center',
    },

    offlineText: {
        ...DarkTheme.styles.text.ui,

        color: DarkTheme.colors.text.negative,
        fontSize: 18,
    },
});

export default styles;
