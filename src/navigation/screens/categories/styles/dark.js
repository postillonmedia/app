/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet, Platform } from 'react-native';

import { DarkTheme } from '../../../../constants/themes';

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: DarkTheme.colors.background,
    },
});

export default styles;