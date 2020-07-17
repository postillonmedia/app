/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet } from 'react-native';

import { DefaultTheme } from '../../../../constants/themes';
import { STEP_NUMBER_RADIUS } from 'react-native-copilot/src/components/style';

export const styles = StyleSheet.create({
    stepNumber: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: STEP_NUMBER_RADIUS,
        borderColor: DefaultTheme.colors.monochrome.white4,
        backgroundColor: DefaultTheme.colors.brandPrimary,
    },

    stepNumberText: {
        fontSize: 10,
        backgroundColor: 'transparent',
        color: DefaultTheme.colors.monochrome.white4,
    },
});

export default styles;
