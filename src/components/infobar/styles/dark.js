/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet } from 'react-native';

import { DarkTheme } from '../../../constants/themes';

export const styles = StyleSheet.create({
    informationIndicator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 1,
    },

    informationNotConnected: {
        backgroundColor: DarkTheme.colors.notifier.info,
        alignItems: 'center',
    },
    informationNotConnectedText: {
        color: DarkTheme.colors.text.negative,
        fontSize: 12,
        padding: 2,
    },

    informationError: {
        backgroundColor: DarkTheme.colors.notifier.error,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    informationErrorText: {
        color: DarkTheme.colors.text.negative,
        paddingVertical: 4,
    },
    informationErrorBtn: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 2,
        backgroundColor: DarkTheme.colors.text.negative,
        color: DarkTheme.colors.notifier.error,
    },
});

export default styles;
