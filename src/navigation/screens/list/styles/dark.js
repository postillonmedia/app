/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet } from 'react-native';

import { DarkTheme } from '../../../../constants/themes/index';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    listFooter: {
        paddingVertical: 25,
    },
    listFooterNotConnected: {
        flexDirection: 'row',
        alignItems: 'center',

        padding: 8,
        marginHorizontal: 16,
        borderRadius: 5,
    },
    listFooterNotConnectedText: {
        ...DarkTheme.styles.text.ui,

        flex: 0.9,
        paddingRight: 8,

        color: DarkTheme.colors.text.negative
    },
    listFooterNotConnectedIcon: {
        flex: .1,
        alignSelf: 'center',
        justifyContent: 'center'
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    heading: {
        ...DarkTheme.styles.text.heading,
        paddingBottom: 5,
    },
    text: DarkTheme.styles.text.ui,

    emptyListContainer: {
        marginTop: 200,

        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default styles;