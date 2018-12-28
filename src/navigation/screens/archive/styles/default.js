/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet, Platform } from 'react-native';

import { DefaultTheme } from '../../../../constants/themes';

export const styles = StyleSheet.create({
    tabs: {
        flex: 1,
    },
    tabBar: {
        backgroundColor: DefaultTheme.colors.tabs.background,
    },
    tabItem: {
        flexDirection: 'row',
    },
    tabLabel: {
        color: DefaultTheme.colors.text.primary,
        fontWeight: '400',
    },
    tabIndicator: {
        backgroundColor: DefaultTheme.colors.brandPrimary,
    },
});

export default styles;