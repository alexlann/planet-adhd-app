import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { FormMethods, IconOptions, SizeOptions } from "../../../types";
import { useUserLevel } from "../../../authentication/AuthProvider";
import { useEffect, useState } from "react";
import { useForm, useMutation } from "../../../core/hooks";
import { progressSchema } from "../../../constants/functional";
import { ErrorElement, FocusedStatusBar, HeaderSubtitle, Heading2, HorizontalLine, Icon, Loader } from "../../../components";
import { containerStyle } from "../../../constants/styles";
import { COLORS, FONTS, SIZES, SHADOWS } from "../../../constants";
import Level from "../../../components/level/Level";
import SecondaryButton from "../../../components/buttons/SecondaryButton";
import GoalList from "../../../components/goals/GoalList";
import { API_URL } from "@env"

export default function progress() {
    const { t } = useTranslation();
    const topCardHeight = 150;
    const path = "user-levels"
    const userLevel = useUserLevel();
    const [errorField, setErrorField] = useState("");
    const [goalsIsEmpty, setGoalsIsEmpty] = useState(false)
    const { isLoading, error, mutate } = useMutation();

    const defaultData = {
        reward: userLevel?.reward || "",
    };
    const { values, errors, handleChange } = useForm(progressSchema, {
        ...defaultData,
    });

    useEffect(() => {
        if(!isLoading) {
            setErrorField("");
        }
    }, [isLoading, values]);


    const saveReward = () => {
        mutate(`${API_URL}/${path}/${userLevel?.id}`, {
            method: FormMethods.patch,
            data: values,
        });
    };

    // handle errors and loading
    if (isLoading) {
        return <Loader size={SizeOptions.large} />
    }

    if (error || Object.keys(errors).length > 0) {
        !errorField && setErrorField(t("error-something-wrong"));
    }

    return (
        <View style={containerStyle.wrapper}>
            <View>
                <View style={containerStyle.container}>
                    <FocusedStatusBar />
                    <HeaderSubtitle subtitle={ t("progress-sub") } />
                    <View style={styles.main}>
                        <ScrollView style={containerStyle.container}>

                            {/* LEVEL & REWARD */}
                            <KeyboardAvoidingView style={[{height: topCardHeight}, styles.spaceBetween]}>
                                <Level size={topCardHeight/2} style={styles.halfWidth} />
                                <View style={[styles.rewardWrapper, styles.halfWidth]}>

                                    {/* LEVEL */}
                                    <View style={styles.rewardTitleWrapper}>
                                        <Icon size={24} color={COLORS.secondary} icon={IconOptions.medal} />
                                        <Text style={styles.rewardTitle}>{ t("progress-next-reward") }</Text>
                                    </View>

                                    {/* REWARD FORM */}
                                    <TextInput
                                        multiline={true}
                                        style={styles.rewardInput}
                                        onChangeText={(value) => {handleChange(value, "reward")}}
                                        placeholder={ t("placeholder-progress-reward") }
                                        value={ values.reward }
                                    />

                                    <View style={styles.saveRewardBtn}>
                                        <SecondaryButton handlePress={saveReward} disabled={ !values.reward } title={ t("btn-save") } />
                                    </View>
                                </View>
                            </KeyboardAvoidingView>

                            {/* ERROR */}
                            { errorField && (
                                <ErrorElement title={errorField} />
                            ) }

                            <HorizontalLine />

                            {/* COMPLETED GOALS */}
                            <View>
                                <View style={[styles.spaceBetween, styles.baseline]}>
                                    <Heading2>{ t("progress-sub-goals") }</Heading2>
                                    {/* GO TO COMPLETED GOALS BUTTON */}
                                    { !goalsIsEmpty && (
                                        <SecondaryButton
                                            title={ t("btn-link-see-all") }
                                            arrow="right"
                                            linkButtonProps={{
                                                title: t("btn-link-see-all"),
                                                screen: "/progress/completedGoals",
                                            }}
                                        />
                                    )}
                                </View>
                                {/* GOAL LIST */}
                                <GoalList
                                    scroll={false}
                                    size={SizeOptions.small}
                                    style={styles.goalList}
                                    queryCompleted={true}
                                    limit={2}
                                    setIsEmpty={setGoalsIsEmpty}
                                />
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    main: {
        marginTop: 32,
        backgroundColor: COLORS.white,
        paddingVertical: 20,
        borderRadius: 20,
        ...SHADOWS.drop
    },
    rewardWrapper: {
        gap: 4,
    },
    rewardTitleWrapper: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
        marginBottom: 8,
    },
    rewardInput: {
        borderColor: COLORS.secondary,
        borderWidth: 1,
        borderRadius: SIZES.small,
        paddingHorizontal: SIZES.small,
        paddingVertical: SIZES.small/2,
        height: "60%",
        fontSize: SIZES.font,
        color: COLORS.lightBlack,
        textAlignVertical: "top",
    },
    rewardTitle: {
        marginTop: 4,
        fontSize: SIZES.small,
        color: COLORS.darkGray,
        fontFamily: FONTS.medium,
    },
    saveRewardBtn: {
        marginLeft: "auto",
        marginVertical: 4,
    },
    goalList: {
        marginLeft: -SIZES.medium,
    },
    spaceBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: SIZES.extraSmall,
    },
    halfWidth: {
        width: "48%",
    },
    baseline: {
        alignItems: "baseline",
        flexDirection: "row",
        gap: SIZES.extraSmall,
    },
});
