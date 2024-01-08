import { View } from 'react-native';
import { goToHour } from '../../core/maths/dateTime';
import { InputOptions } from '../../types';
import { FocusedStatusBar, StepsForm } from '../../components';
import { containerStyle } from '../../constants/styles';
import { addGoalSchema } from '../../constants/functional';

export default function addGoal() {
    const path = "goals";
    const todayISO = new Date().toISOString();
    const defaultData = {
        title: "",
        reward: "",
        notes: "",
        startTime: goToHour(todayISO, 8),
        stopTime: goToHour(todayISO, 9),
    };

    const inputFields = [{
        title: "title",
        type: InputOptions.text,
    }, {
        title: "reward",
        type: InputOptions.text,
    }, {
        title: "notes",
        type: InputOptions.text,
    }, {
        title: "startTime",
        type: InputOptions.startTime,
    }];

    return (
        <View style={containerStyle.wrapper}>
            <FocusedStatusBar />

            {/* GOAL FORM */}
            <StepsForm
                defaultData={defaultData}
                formTitle="goal"
                path={path}
                inputFields={inputFields}
                navigationProps={{screen: "/goals"}}
                schema={addGoalSchema}
            />
        </View >
    );
}
