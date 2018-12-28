/**
 * Created by Kptn-Seb on 7.02.2018.
 */

import { StyleSheet } from 'react-native';

import { DefaultTheme, DarkTheme } from '../../../constants/themes';


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

    articleImageContainer: {
        margin: 16,
    },

    text: DarkTheme.styles.text.article,

    heading: {
        ...DarkTheme.styles.text.heading,
        textAlign: 'left',

        marginHorizontal: 16,
        marginVertical: 5,
    },

    line: {
        height: 3,
        width: '20%',

        marginHorizontal: 16,
        marginVertical: 5,

        backgroundColor: DarkTheme.colors.brandPrimary,
    },

    date: {
        ...DarkTheme.styles.text.date,
        textAlign: 'left',

        marginTop: 5,
        marginHorizontal: 16,
    },

    adContainer: {
        flex: 1,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },

    recommendationsContainer: {
        marginTop: 32,
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