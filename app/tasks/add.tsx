import { View } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';
import { InputOptions, Status, TaskImportance } from '../../types';
import { useUser } from '../../authentication/AuthProvider';
import { goToHour } from '../../core/maths/dateTime';
import { containerStyle } from '../../constants/styles';
import { FocusedStatusBar, StepsForm } from '../../components';
import { addTaskSchema } from '../../constants/functional';

export default function addTask() {
    const path = "tasks";
    const { activeDay } = useGlobalSearchParams();
    const selectedDay = activeDay as string || new Date().toISOString();
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

    const inputFields = [{
        title: "title",
        type: InputOptions.text,
    }, {
        title: "reward",
        type: InputOptions.text,
    }, {
        title: "notes",
        type: InputOptions.text
    }, {
        title: "importance",
        type: InputOptions.tags,
    }, {
        title: "category",
        type: InputOptions.categories,
    }, {
        title: "goal",
        type: InputOptions.goal,
    }, {
        title: "startTime",
        type: InputOptions.startTime,
    }];
    
    return (
        <View style={containerStyle.wrapper}>
            <FocusedStatusBar />
            {/* TASK FORM */}
            <StepsForm
                defaultData={defaultData}
                formTitle="task"
                inputFields={inputFields}
                navigationProps={{screen: "/calendar"}}
                path={path}
                schema={addTaskSchema}
            />
        </View>
    );
}
