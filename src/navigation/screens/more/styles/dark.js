/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet } from 'react-native';

import { DarkTheme } from '../../../../constants/themes';


export const styles = StyleSheet.create({
    text: {
        ...DarkTheme.styles.text.ui,

        textAlign: 'left'
    },

    buttonText: {
        ...DarkTheme.styles.text.ui,
        color: DarkTheme.colors.text.secondary,
        fontSize: 18,

        marginHorizontal: 6,
    },

    group: {
        marginBottom: 16,
    },

    button: {
        paddingVertical: 12,
        paddingHorizontal: 6,

        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        
        marginHorizontal: 16,
        marginBottom: 8,
        borderRadius: 5,
        minHeight: 54,

        backgroundColor: DarkTheme.colors.bg.lighter,

        elevation: 1,
        shadowColor: DarkTheme.colors.shadow,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.4,
    },

    heading: {
        marginTop: 28,
        marginBottom: 12,
        marginHorizontal: 16,
        color: DarkTheme.colors.text.lighter,
        fontFamily: 'FiraSans-Regular',
        fontSize: 12,
    },

    settingsButton: {
        marginTop: 16,
    },

    iconContainerInside: {
        justifyContent: 'space-between',
    },

    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    singleGiftContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    singleGiftInnerContainer: {
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: DarkTheme.colors.bg.lightest,
        padding: 20,
    },
    singleGiftBankInfo: {
        margin: 15,
    },
    singleGiftPaypal: {
        color: DarkTheme.colors.text.negative,
        backgroundColor: '#0052a3',
        fontWeight: 'bold',
        fontStyle: 'italic',
        borderRadius: 15,
        margin: 15,
        padding: 7,
    },
});

export default styles;