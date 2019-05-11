/**
 * Created by Kptn-Seb on 7.02.2018.
 */

import { StyleSheet } from 'react-native';

import { DarkTheme } from '../../../constants/themes';


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

    section: {
        marginTop: 32,
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
        ...DarkTheme.styles.text.ui,
        fontSize: 20,
    },

    // comments
    commentsContainer: {
        backgroundColor: DarkTheme.colors.bg.lighter,

        marginHorizontal: 16,
        marginVertical: 16,

        padding: 32,
    },

    commentsLoadButton: {
        borderRadius: 5,
        backgroundColor: DarkTheme.colors.monochrome.dark3,

        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        marginHorizontal: 16,
        marginVertical: 8,

        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    commentsLoadButtonText: {
        ...DarkTheme.styles.text.ui,

        color: DarkTheme.colors.text.negative,
        fontSize: 16,
        fontFamily: 'FiraSans-SemiBold',

        marginHorizontal: 5,
    },

    commentsLoadAlwaysButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        marginHorizontal: 32,
        marginTop: 8,

        paddingHorizontal: 16,
        paddingTop: 8,
    },
    commentsLoadAlwaysButtonText: {
        ...DarkTheme.styles.text.ui,

        color: DarkTheme.colors.text.secondary,
        fontSize: 14,
        textDecorationLine: 'underline',
    },

    commentsWebViewContainer: {
        marginHorizontal: 16,
    },
    commentsWebView: {
        flex: 1,

        marginHorizontal: 0, // important for rendering

        backgroundColor: DarkTheme.colors.monochrome.white4,
    }
});

export default styles;