import { StyleSheet, View } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';
import { goToHour } from '../../core/maths/dateTime';
import { FocusedStatusBar, StepsDetail } from '../../components';
import { addGoalSchema } from '../../constants/functional';
import { COLORS } from '../../constants';

export default function GoalDetailScreen() {
    const path = "goals";
    const todayISO = new Date().toISOString();
    const { id } = useGlobalSearchParams();
    const defaultData = {
        title: "",
        reward: "",
        notes: "",
        startTime: goToHour(todayISO, 8),
        stopTime: goToHour(todayISO, 9),
    };

    const inputFields = [
        "title",
        "reward",
        "notes",
        "startTime",
    ];

    return (
        <View style={styles.wrapper}>
            <FocusedStatusBar />

            {/* GOAL FORM */}
            <StepsDetail
                defaultData={defaultData}
                formTitle="goal"
                id={parseInt(id as string)}
                navigationProps={{screen: "/goals"}}
                path={path}
                schema={addGoalSchema}
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
