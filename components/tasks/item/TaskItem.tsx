import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTranslation } from "react-i18next";
import { AuthContextType, ButtonColors, ButtonType, FetchItemOptions, FetchItemType, IconOptions, ScorePointOptions, Status, TaskImportance, TaskImportanceTypes, TaskType, UserLevelType } from '../../../types';
import Icon from '../../visualElements/Icon';
import SecondaryButton from '../../buttons/SecondaryButton';
import { useAuthContext, useUserLevel } from "../../../authentication/AuthProvider";
import CompletionModal from "../../modals/CompletionModal";
import Loader from "../../loader/Loader";
import { useMutation } from "../../../core/hooks";
import handleScore from "../../../core/score/handleScore";
import { updateStatus } from "../../../core/hooks/completeAssignment";
import { getHourMinuteFromDate } from "../../../core/maths/dateTime";
import { COLORS, SIZES, SHADOWS } from "../../../constants";
import ErrorElement from "../../notices/ErrorElement";
import { router } from "expo-router";

const TaskItem = ({ task, showHour = true, invalidate }: { task: TaskType, showHour?: boolean, invalidate: (args0: boolean | number | string)=>void }) => {
    const { t } = useTranslation();
    const path = "tasks";
    const userLevel = useUserLevel();
    const [tabOpen, setTabOpen] = useState(false);
    const [errorField, setErrorField] = useState("");
    const [modal, setModal] = useState<FetchItemType | null>(null);
    const [userLevelHasUpdated, setUserLevelHasUpdated] = useState<boolean>(false);
    const [updatedUserlevel, setUpdatedUserlevel] = useState(userLevel);
    const { mutate, error, isLoading } = useMutation();
    const authContext = useAuthContext();
    const {
        id,
        importance,
        reward,
        title,
        category,
        notes,
        startTime,
        stopTime,
    } = task;

    // handle tab
    const handleTabPress = () => {
        setTabOpen(!tabOpen);
    }

    const completeTask = async (status: Status) => {
        // only post new score if task was succesfully completed
        if(status === Status.success) {
        // post new score and pass whether or not level has been updated
            handleScore(
                ScorePointOptions.task,
                // open modal
                ()=>setModal({
                    type: FetchItemOptions.task,
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

        // update task status to success or fail
        updateStatus({
            id,
            mutate,
            path,
            status,
        })

        // pass id of invalidated item
        if(status === Status.failed) {
            invalidate(id);
        }
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
            {/* // MODAL */}
            <CompletionModal
                modalState={{modal, setModal}}
                userLevelState={{userLevelHasUpdated, setUserLevelHasUpdated}}
                userLevel={updatedUserlevel as UserLevelType}
                invalidate={invalidate}
            />
            <View>
                <View style={styles.tasksWrapper}>

                    {/* STARTIME */}
                    <Text style={styles.time}>
                        {showHour && getHourMinuteFromDate(startTime)}
                    </Text>

                    {/* TASK */}
                    <View style={styles.task}>
                        <Pressable onPress={()=>router.push({pathname: `/tasks/${id}`, params: {taskId: id }})}>

                            <View style={[styles.innerTask, { borderLeftColor: category ? category.color : COLORS.darkGray, borderLeftWidth: 6 }]}>
                                <View style={styles.titleButton}>

                                    {/* TITLE AND FLAG ICON */}
                                    <View style={styles.titleWrapper}>
                                        {/* @ts-ignore */}
                                        <Icon size={SIZES.small} color={ButtonColors[TaskImportanceTypes[importance.toLowerCase() as TaskImportance]].primary} icon={IconOptions.flagSolid} />
                                        <Text numberOfLines={1} style={styles.title}>{ title }</Text>
                                    </View>

                                    {/* TAB BUTTON */}
                                    <SecondaryButton
                                        arrow={tabOpen ? "up" : "down" }
                                        handlePress={handleTabPress}
                                        type={ButtonType.soft}
                                    />

                                </View>

                                {/* CATEGORY */}
                                { category && (
                                    <Text style={styles.subtle}>{ category.title }</Text>
                                )}

                                    {/* TAB */}
                                    { tabOpen && 
                                        <View>
                                            {/* START AND STOPTIME */}
                                            <View style={styles.timeRangeWrapper}>
                                                <Icon color={COLORS.darkGray} icon={IconOptions.clock} size={SIZES.small} />
                                                <Text style={styles.subtle}>{`${getHourMinuteFromDate(startTime)} - ${getHourMinuteFromDate(stopTime)}`}</Text>
                                            </View>

                                            {/* NOTES */}
                                            <Text style={styles.subtle}>{notes}</Text>

                                            {/* SUCCESS AND FAIL BUTTONS */}
                                            <View style={styles.completionButtons}>
                                                <SecondaryButton type={ButtonType.danger} title={ t("btn-tasks-failed") } handlePress={() => completeTask(Status.failed)} />
                                                <SecondaryButton type={ButtonType.primary} title={ t("btn-tasks-completed") } handlePress={() => completeTask(Status.success)} />
                                            </View>
                                        </View>
                                    }
                            </View>
                        </Pressable>
                    </View>
                </View>
            </View>

            {/* ERROR */}
            { errorField && (
                <ErrorElement title={errorField} />
            ) }
        </>
    )
}

export default TaskItem;


const styles = StyleSheet.create({
    tasksWrapper: {
        flexDirection: "row",
        marginBottom: SIZES.small,
        justifyContent: "space-between",
    },
    time: {
        width: "25%",
        fontSize: SIZES.font,
        color: COLORS.lightBlack,
    },
    task: {
        width: "70%",
        borderRadius: SIZES.small,
        backgroundColor: COLORS.white,
        ...SHADOWS.drop,
    },
    innerTask: {
        width: "100%",
        marginHorizontal: SIZES.small,
        paddingHorizontal: SIZES.medium,
        paddingVertical: SIZES.small / 2,
    },
    titleButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: SIZES.extraSmall,
        paddingRight: SIZES.extraSmall,
        height: SIZES.extraLarge,
    },
    title: {
        color: COLORS.black,
        fontSize: SIZES.font,
        width: "70%",
    },
    titleWrapper: {
        flexDirection: "row",
        alignItems: "center",
        height: SIZES.extraLarge,
        gap: SIZES.extraSmall,
    },
    subtle: {
        color: COLORS.darkGray,
        fontSize: SIZES.small,
        marginBottom: SIZES.small/2,
    },
    notesList: {
        marginLeft: SIZES.medium,
        marginVertical: SIZES.extraSmall/2,
    },
    timeRangeWrapper: {
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: SIZES.extraSmall/2,
        alignItems: "baseline",
    },
    completionButtons: {
        flexDirection: "row",
        gap: SIZES.font,
        marginTop: SIZES.small/2,
        justifyContent: "flex-end",
        paddingRight: SIZES.extraSmall,
    },
});