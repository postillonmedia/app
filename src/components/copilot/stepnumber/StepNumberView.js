import React from 'react';
import { View, Text } from 'react-native';

import type { Step } from '@okgrow/react-native-copilot/src/types';

type Props = {
    isFirstStep: boolean,
    isLastStep: boolean,
    currentStep: Step,
    currentStepNumber: number,
};


const StepNumber = ({
    isFirstStep,
    isLastStep,
    currentStep,
    currentStepNumber,
    styles,
}: Props) => (
    <View style={styles.stepNumber}>
        <Text style={styles.stepNumberText}>{currentStepNumber}</Text>
    </View>
);

export default StepNumber;
