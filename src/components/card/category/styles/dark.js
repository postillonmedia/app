/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet } from 'react-native';

import { DarkTheme } from './../../../../constants/themes';


export const styles = StyleSheet.create({
    touchable: {
        flex: 1,
        margin: 15,
        backgroundColor: DarkTheme.colors.bg.light,
        borderColor: DarkTheme.colors.border,
        borderRadius: 5,

        elevation: 2,
        shadowColor: DarkTheme.colors.shadow,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.4,
    },

    cardContainer: {
        flex: 1,
        margin: 0,
        padding: 0,
        maxHeight: 90,
    },

    image: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
        opacity: 0.75,
    },

    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 50,
        borderRadius: 5,
    },

    title: {
        fontSize: 18,
        fontFamily: 'FiraSans-Regular',

        backgroundColor: 'rgba(0,0,0,0)',
        color: DarkTheme.colors.text.secondary,

        alignSelf: 'center',
        paddingVertical: 18,
    },
});

export default styles;