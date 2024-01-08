import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SizeOptions } from '../../types';
import { buttonStyle, containerStyle } from '../../constants/styles';
import { FocusedStatusBar, HeaderSubtitle, HorizontalLine, TaskCalendar, TaskList } from '../../components';
import PlusButton from '../../components/buttons/PlusButton';
import { useLocalSearchParams } from 'expo-router';

export default function calendar() {
    const { t } = useTranslation();
    const today = new Date().toISOString().split("T")[0];
    const [activeDay, setActiveDay] = useState(today);
    const { invalidateData } = useLocalSearchParams();
    const [invalidateDataState, setInvalidateDataState] = useState<any>(invalidateData as string || false);
    const [invalidateTaskData, setInvalidateTaskData] = useState<any>(false);

    // invalidate data when params.invalidateData change
    useEffect(() => {
        if (invalidateData) {
            setInvalidateDataState(invalidateData as string);
            setInvalidateTaskData(invalidateData as string);
        }

    }, [invalidateData]);

    return (
        <View style={containerStyle.wrapper}>
            <FocusedStatusBar />
            <View style={styles.main}>

                {/* SUBTITLE */}
                <View style={containerStyle.container}>
                    <HeaderSubtitle subtitle={ t("calendar-sub") } />
                </View>

                <ScrollView style={containerStyle.container}>
                    <View style={styles.content}>

                        {/* CALENDAR */}
                        <TaskCalendar
                            invalidateData={invalidateTaskData || invalidateData as string}
                            activeDay={activeDay}
                            setActiveDay={setActiveDay}
                        />
                        
                        <HorizontalLine />

                        {/* TASK LIST */}
                        <TaskList
                            invalidateData={{setInvalidate: setInvalidateDataState, invalidate: invalidateDataState}}
                            sizeNothingHere={SizeOptions.small}
                            limitedDay={activeDay}
                            style={styles.taskList}
                        />
                    </View>
                </ScrollView>

                {/* PLUS BUTTON */}
                <View style={[containerStyle.container, buttonStyle.buttonContainer]}>
                    <PlusButton linkButtonProps={{screen: `/tasks/add`, props: { activeDay } }} />
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    content: {
        marginTop: 19,
    },
    main: {
        position: "relative",
        height: "100%",
    },
    taskList: {
        paddingBottom: 30,
    },
});
