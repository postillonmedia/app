/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet } from 'react-native';

import { DarkTheme } from '../../../../constants/themes';
import { STEP_NUMBER_RADIUS } from "@okgrow/react-native-copilot/src/components/style";


export const styles = StyleSheet.create({
    stepNumber: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: STEP_NUMBER_RADIUS,
        borderColor: DarkTheme.colors.monochrome.white4,
        backgroundColor: DarkTheme.colors.brandPrimary,
    },

    stepNumberText: {
        fontSize: 10,
        backgroundColor: 'transparent',
        color: DarkTheme.colors.monochrome.white4,
    },
});

export default styles;