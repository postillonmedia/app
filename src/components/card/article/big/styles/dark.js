/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet } from 'react-native';

import { DarkTheme } from '../../../../../constants/themes/index';
import {DefaultTheme} from "../../../../../constants/themes";


export const styles = StyleSheet.create({
    touchable: {
        flex: 1,
        margin: 15,
        padding: 0,
    },

    cardContainer: {
        flex: 1,
        margin: 0,
        padding: 0,
        marginTop: 5,
    },

    imageContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 200,
        marginHorizontal: 5,

        elevation: 2,
        shadowColor: DarkTheme.colors.shadow,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.4,

        borderRadius: 5,
        borderColor: DarkTheme.colors.border,
        backgroundColor: DarkTheme.colors.bg.lightest,
    },

    image: {
        flex: 1,
        borderRadius: 5,
    },

    textContainerWithImage: {
        paddingTop: 160,
    },

    textContainer: {
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 40,
        paddingTop: 13,
        paddingLeft: 22,
        paddingRight: 18,
        paddingBottom: 13,
        borderRadius: 5,  
         
        borderColor: DarkTheme.colors.border,
        backgroundColor: DarkTheme.colors.bg.lighter,
    },

    title: {
        ...DarkTheme.styles.text.heading,
        color: DarkTheme.colors.text.secondary,

        fontFamily: 'FiraSans-Medium',
    },

    date: {
        ...DefaultTheme.styles.text.date,

        marginTop: 12,
    },

    button: {
        position: 'absolute',
        right: 30,
        top: 180,

        height: 40,
        width: 40,
        
        elevation: 3,
        shadowColor: DarkTheme.colors.shadow,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.6,

        borderWidth: 2,
        borderRadius: 20,
        borderColor: DarkTheme.colors.text.highlighted,
        backgroundColor: DarkTheme.colors.bg.lightest,

        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTouchable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default styles;