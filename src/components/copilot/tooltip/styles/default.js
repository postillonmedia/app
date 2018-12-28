/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet } from 'react-native';

import { DefaultTheme } from '../../../../constants/themes';

export const styles = StyleSheet.create({
    tooltipText: DefaultTheme.styles.text.ui,
    tooltipContainer: {
        flex: 1,
    },

    button: {
        padding: 10,
    },
    buttonText: {
        ...DefaultTheme.styles.text.ui,
        color: DefaultTheme.colors.brandPrimary,
    },
    bottomBar: {
        marginHorizontal: -10,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});

export default styles;