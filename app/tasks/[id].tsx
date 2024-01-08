import {  StyleSheet, View } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';
import { Status, TaskImportance } from '../../types';
import { useUser } from '../../authentication/AuthProvider';
import { goToHour } from '../../core/maths/dateTime';
import { FocusedStatusBar, StepsDetail } from '../../components';
import { addTaskSchema } from '../../constants/functional';
import { COLORS } from '../../constants';

export default function TaskDetailScreen() {
    const { id } = useGlobalSearchParams();
    const path = "tasks";
    const selectedDay = new Date().toISOString();
    const defaultData = {
        title: "",
        reward: "",
        notes: "",
        importance: TaskImportance.low,
        category: 0,
        user: useUser(),
        goal: 0,
        status: Status.notStarted,
        completed: false,
        startTime: goToHour(selectedDay, 8),
        stopTime: goToHour(selectedDay, 9),
    };

    const inputFields = [
        "title",
        "reward",
        "notes",
        "importance",
        "category",
        "goal",
        "startTime",
    ];

    return (
        <View style={styles.wrapper}>
            <FocusedStatusBar />

            {/* TASK FORM */}
            <StepsDetail
                defaultData={defaultData}
                formTitle="task"
                id={parseInt(id as string)}
                navigationProps={{screen: "/calendar"}}
                path={path}
                schema={addTaskSchema}
                inputFields={inputFields}
            />
        </View >
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: COLORS.primaryLight,
        flex: 1,
    },
});
