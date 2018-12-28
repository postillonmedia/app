import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import type { Step } from '@okgrow/react-native-copilot/src/types';

type Props = {
    isFirstStep: boolean,
    isLastStep: boolean,
    handleNext: func,
    handlePrev: func,
    handleStop: func,
    currentStep: Step,
    t: func,
};


const Tooltip = ({
    isFirstStep,
    isLastStep,
    handleNext,
    handlePrev,
    handleStop,
    currentStep,
    t,
    styles,
 }: Props) => (
    <View>
        <View style={styles.tooltipContainer}>
            <Text testID="stepDescription" style={styles.tooltipText}>{currentStep.text}</Text>
        </View>
        <View style={styles.bottomBar}>
            {
                !isLastStep ?
                    <TouchableOpacity onPress={handleStop} style={styles.button}>
                        <Text style={styles.buttonText}>{t('skip')}</Text>
                    </TouchableOpacity>
                    : null
            }
            {
                !isFirstStep ?
                    <TouchableOpacity onPress={handlePrev} style={styles.button}>
                        <Text style={styles.buttonText}>{t('previous')}</Text>
                    </TouchableOpacity>
                    : null
            }
            {
                !isLastStep ?
                    <TouchableOpacity onPress={handleNext} style={styles.button}>
                        <Text style={styles.buttonText}>{t('next')}</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={handleStop} style={styles.button}>
                        <Text style={styles.buttonText}>{t('finish')}</Text>
                    </TouchableOpacity>
            }
        </View>
    </View>
);

export default Tooltip;