import { View, StyleSheet, Pressable } from 'react-native';
import PrimaryButton from './PrimaryButton';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { COLORS, SIZES } from '../../constants';
import { containerStyle } from '../../constants/styles';

const ProgressNav = ({ totalSteps, currentStepState, onPress, disabled } : { totalSteps: number, currentStepState: {currentStep: number, setCurrentStep: (args0: any)=>void }, onPress: ()=>void, disabled?: boolean } ) => {
    const { t } = useTranslation();
    const [highestStep, setHighestStep] = useState(0);
    const title = currentStepState.currentStep !== (totalSteps - 1)
        ? t("btn-next")
        : t("btn-ready");
    
    useEffect(() => {
        currentStepState.currentStep > highestStep && setHighestStep(currentStepState.currentStep);
    }, [currentStepState.currentStep])

    // Add step to array of steps
    const stepElementsArray = [];
    for (let i = 0; i < totalSteps; i++) {
        stepElementsArray.push(
            <Pressable key={`step-${i}`} onPress={()=> i <= highestStep && currentStepState.setCurrentStep(i)}>
                <View style={[styles.progress, {
                    width: currentStepState.currentStep === i ? 42 : 18,
                    backgroundColor: highestStep >= i ? COLORS.secondary : COLORS.secondaryLight,
                }]}></View>
            </Pressable>
        );
    }

    return (
        <View style={styles.wrapper}>
            <View style={containerStyle.container}>
                <PrimaryButton title={title} handlePress={onPress} disabled={disabled} />
                <View style={styles.progressWrapper}>
                    {stepElementsArray}
                </View>
            </View>
        </View>
    )
}

export default ProgressNav

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: SIZES.medium,
        borderTopRightRadius: SIZES.medium,
        height: 164,
    },
    container: {
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        flex: 1,
        marginTop: 32,
    },
    progressWrapper: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: "center",
        gap: 6,
    },
    progress: {
        height: 10,
        width: 18,
        borderRadius: 999,
    },
});