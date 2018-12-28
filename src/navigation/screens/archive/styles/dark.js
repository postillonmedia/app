/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet, Platform } from 'react-native';

import { DarkTheme } from '../../../../constants/themes';

export const styles = StyleSheet.create({
    tabs: {
        flex: 1,
    },
    tabBar: {
        backgroundColor: DarkTheme.colors.tabs.background,
    },
    tabItem: {
        flexDirection: 'row',
    },
    tabLabel: {
        color: DarkTheme.colors.text.primary,
        fontWeight: '400',
    },
    tabIndicator: {
        backgroundColor: DarkTheme.colors.monochrome.light2,
    },
});

export default styles;