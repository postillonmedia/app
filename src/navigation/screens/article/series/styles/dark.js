/**
 * Created by Kptn-Seb on 7.02.2018.
 */

import { StyleSheet } from 'react-native';

import { DefaultTheme, DarkTheme } from '../../../../../constants/themes';


const controls = {
    height: 50,

    margin: 16,
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    controls: {
        position: 'absolute',
        bottom: 0,

        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',

        ...controls,

        backgroundColor: DarkTheme.colors.bg.lighter,
        borderRadius: controls.height / 2,

        elevation: 1,

        shadowColor: DarkTheme.colors.shadow,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 1,
    },
    spacer: controls,
    button: {
        width: controls.height,
        height: controls.height,
        padding: 5,
        marginHorizontal: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: DarkTheme.styles.text.article,

    title: {
        borderLeftWidth: 3,
        borderColor: DarkTheme.colors.brandPrimary,
    },
    titleText: {
        ...DarkTheme.styles.text.heading,
        color: DarkTheme.colors.text.secondary,
        textAlign: 'left',

        paddingHorizontal: 16,
    },

    dateContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        marginVertical: 20,
    },
    date: {
        ...DarkTheme.styles.text.date,

        textAlign: 'left',
        marginHorizontal: 16,
    },
    dateLine: {
        flex: 1,

        backgroundColor: DarkTheme.colors.text.highlighted,

        height: 2,
        borderTopLeftRadius: 1,
        borderBottomLeftRadius: 1,
    },

    adContainer: {
        flex: 1,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },


    // settings
    settingsModal: {
        justifyContent: 'flex-end',
    },

    // loading
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        ...DefaultTheme.styles.text.ui,
        fontSize: 20,
    }
});

export default styles;