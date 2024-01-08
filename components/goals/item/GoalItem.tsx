import { View, Text, StyleSheet, Alert, FlexAlignType, Pressable } from 'react-native'
import Icon from '../../visualElements/Icon';
import { AuthContextType, ButtonType, FetchItemOptions, FetchItemType, FormMethods, GoalType, IconOptions, ScorePointOptions, SizeOptions, Status, StatusTypes, UserLevelType } from '../../../types';
import { useTranslation } from 'react-i18next';
import Loader from '../../loader/Loader';
import { useAuthContext, useUserLevel } from '../../../authentication/AuthProvider';
import { useState } from 'react';
import { COLORS, FONTS, SIZES } from '../../../constants';
import { useMutation } from '../../../core/hooks';
import handleScore from '../../../core/score/handleScore';
import { updateStatus } from '../../../core/hooks/completeAssignment';
import SecondaryButton from '../../buttons/SecondaryButton';
import { toLongDate } from '../../../core/maths/dateTime';
import ErrorElement from '../../notices/ErrorElement';
import Reward from '../../rewards/Reward';
import Checkbox from '../../forms/item/Checkbox';
import { DIMENSIONS } from '../../../constants/styles';
import CompletionModal from '../../modals/CompletionModal';
import { router } from 'expo-router';
import { API_URL } from "@env"

const GoalItem = ({ goal, pressable=true, size = SizeOptions.medium, invalidate, lastItem } : { goal: GoalType, pressable?: boolean, size?: SizeOptions, invalidate: (args: boolean | number | string) => void, lastItem: boolean }) => {
    // VARIABLE STYLES
    const variableGoalWrapperStyle = {
        "maxHeight":
            (size === SizeOptions.small
                ? 50
                : size === SizeOptions.medium
                ? 110
                : 140
            ),
        "backgroundColor":
            (size === SizeOptions.large
                ? COLORS.white
                : "transparent"
            ),
        "paddingVertical":
            (size === SizeOptions.large
                ? SIZES.small
                : 0
            ),
        "marginBottom": lastItem
        ? 0
        : size === SizeOptions.small
        ? SIZES.extraSmall
        : SIZES.small
    }
    const variableCheckboxStyle = {
        "alignItems": size === SizeOptions.small ? "center" : "flex-start" as FlexAlignType,
        "backgroundColor": "transparent",
    }

    // VARIABLES
    const { t } = useTranslation();
    const path = "goals";
    const userLevel = useUserLevel();
    const authContext = useAuthContext();
    const [modal, setModal] = useState<FetchItemType | null>(null);
    const [errorField, setErrorField] = useState("");
    const [userLevelHasUpdated, setUserLevelHasUpdated] = useState<boolean>(false);
    const [updatedUserlevel, setUpdatedUserlevel] = useState(userLevel);
    const { isLoading, error, mutate } = useMutation();
    const [tabOpen, setTabOpen] = useState(false);
    const {
        id,
        title,
        reward,
        status,
        completed,
        startTime,
        stopTime,
    } = goal;
    

    // FUNCTIONS
    // handle open tab
    const handleTabPress = () => {
        setTabOpen(!tabOpen);
    }

    // complete goal
    const completeGoal = async (status: Status) => {
        const alertTitle = status === Status.success ? t("alert-success-goal-title") : t("alert-fail-goal-title");
        const alertBody = `${status === Status.success ? t("alert-success-goal-body") : t("alert-fail-goal-body")} "${goal.title}"?`;
        Alert.alert(alertTitle, alertBody, [
            {
              text: t("alert-cancel"),
              style: 'cancel',
            },
            {text: t("alert-yes"), onPress: async () => {
                // only post new score if goal was succesfully completed
                if(status === Status.success) {
                // post new score and pass whether or not level has been updated
                    handleScore(
                        ScorePointOptions.goal,
                        // open modal
                        ()=>setModal({
                            type: FetchItemOptions.goal,
                            title,
                            reward,
                            id,
                        }),
                        userLevel as UserLevelType,
                        { mutate, error, isLoading },
                        authContext as AuthContextType,
                        setUserLevelHasUpdated,
                        setUpdatedUserlevel,
                    )
                }

                // update goal status to success or fail
                updateStatus({
                    id,
                    mutate,
                    path,
                    status,
                })

                if(status === Status.failed) {
                    invalidate(true);
                }
            }},
        ]);
    }

    // delete goal
    const deleteGoal = async () => {
        const alertTitle = t("alert-delete-goal-title");
        const alertBody = `${t("alert-delete-goal-body")} "${goal.title}"?`;
        Alert.alert(alertTitle, alertBody, [
            {
              text: t("alert-cancel"),
              style: 'cancel',
            },
            {text: t("alert-delete"), style: "destructive", onPress: async () => {
                mutate(`${API_URL}/${path}/${id}`, {
                    method: FormMethods.delete,
                    onSuccess: () => invalidate(true),
                });
            }},
        ]);
    }

    // handle isLoading and errors
    if(isLoading) {
        return <Loader />
    }

    if (error) {
        !errorField && setErrorField(t("error-something-wrong"));
    }

    return (
        <>
            {/* MODAL */}
            <CompletionModal
                modalState={{modal, setModal}}
                userLevelState={{userLevelHasUpdated, setUserLevelHasUpdated}}
                userLevel={updatedUserlevel as UserLevelType}
                invalidate={invalidate}
            />
            <Pressable onPress={()=>pressable && router.push({pathname: `/goals/${id}`, params: {goalId: id }})}>
                <View style={[styles.goalWrapper, variableGoalWrapperStyle, tabOpen && {maxHeight: 170}]}>
                    <Checkbox disabled={completed} fillStyle={StatusTypes[status] as ButtonType | false} handlePress={() => completeGoal(Status.success)} style={variableCheckboxStyle} >
                        <View style={ styles.checkboxContent }>

                            {/* TITLE */}
                            <View style={styles.titleWrapper}>
                                <Text numberOfLines={1} style={[styles.title, size === SizeOptions.small ? styles.titleSmall : styles.titleLarge]}>{ title }</Text>
                                { size === SizeOptions.large && (
                                    <View style={{marginTop: -8}}>
                                        <SecondaryButton
                                            arrow={tabOpen ? "up" : "down" }
                                            handlePress={handleTabPress}
                                            type={ButtonType.soft}
                                        />
                                    </View>
                                )}
                            </View>

                            {/* START AND STOPTIME */}
                            <View style={ styles.deadlineWrapper }>
                                <Text style={styles.deadline}>{ toLongDate(startTime) }</Text>
                                <Icon size={SIZES.small} color={ COLORS.darkGray } icon={IconOptions.right} />
                                <Text style={styles.deadline}>{ toLongDate(stopTime) }</Text>
                            </View>

                            {/* REWARD */}
                            { !completed && (
                                <Reward title={reward} />
                            )}

                            {/* FAILED AND COMPLETED BUTTONS */}
                            { tabOpen && (
                                <View style={styles.completionButtons}>
                                    <SecondaryButton type={ButtonType.warning} title={t("btn-failed")} handlePress={()=>completeGoal(Status.failed)} />
                                    <SecondaryButton type={ButtonType.danger} title={t("btn-delete")} handlePress={deleteGoal} />
                                </View>
                            )}
                        </View>
                    </Checkbox>
                </View>
            </Pressable>

            {/* ERROR */}
            { errorField && (
                <ErrorElement title={errorField} />
            ) }
        </>
    )
}

export default GoalItem;


const styles = StyleSheet.create({
    goalWrapper: {
        backgroundColor: "yellow",
        borderRadius: SIZES.small,
    },
    checkboxContent: {
        width: DIMENSIONS.width * 0.9 * 0.9 * 0.9 - 18,
        paddingLeft: -21,
        marginTop: SIZES.font,
    },
    titleWrapper: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        gap: SIZES.medium,
        height: SIZES.extraLarge,
        width: "100%",
    },
    title: {
        color: COLORS.lightBlack,
        fontFamily: FONTS.regularText,
        fontSize: SIZES.font,
        lineHeight: SIZES.font,
        height: SIZES.extraLarge,
        width: "80%",
        verticalAlign: "middle",
    },
    titleLarge: {
        fontSize: SIZES.font,
        lineHeight: 24,
        marginBottom: 12,
    },
    titleSmall: {
        fontSize: SIZES.small,
        lineHeight: 21,
        marginBottom: 2,
    },
    deadlineWrapper: {
        flexDirection: "row",
        gap: SIZES.small,
        alignItems: "baseline",
        marginBottom: SIZES.extraSmall,
    },
    deadline: {
        color: COLORS.darkGray,
        fontSize: SIZES.small,
        fontFamily: FONTS.regularText,
    },
    buttonsWrapper: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: SIZES.font,
    },
    completionButtons: {
        flexDirection: "row",
        gap: SIZES.font,
        marginTop: SIZES.small,
        justifyContent: "flex-end",
        paddingRight: SIZES.extraSmall,
    },
});