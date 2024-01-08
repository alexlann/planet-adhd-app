import { StyleSheet, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { containerStyle } from '../../constants/styles';
import { FocusedStatusBar, HeaderSubtitle, HorizontalLine, TaskList } from '../../components';
import { COLORS } from '../../constants';
import GoalsDashboard from '../../components/goals/GoalsDashboard';
import LevelDashboard from '../../components/level/LevelDashboard';
import { useGlobalSearchParams } from 'expo-router';

export default function dashboard () {
    const { t } = useTranslation();
    const { invalidateData } = useGlobalSearchParams();
    const [invalidateDataState, setInvalidateDataState] = useState<any>(invalidateData || false);

    // invalidate data when params.invalidateData change
    useEffect(() => {
        if (invalidateData) {
            setInvalidateDataState(invalidateData);
        }
    }, [invalidateData]);
    
    return (
        <View style={containerStyle.wrapper}>
            <View style={containerStyle.container}>
                <FocusedStatusBar />
                <HeaderSubtitle subtitle={ t("dashboard-sub") } />
                <ScrollView style={styles.main}>
                    <View style={styles.cardWrapper}>
                        <View style={styles.card}>
                            <View style={styles.contentWrapper}>

                                {/* GOALS */}
                                <GoalsDashboard />

                                {/* LEVEL */}
                                <LevelDashboard />

                            </View>
                        </View>
                    </View>

                    <HorizontalLine />

                    {/* TASKLIST */}
                    <TaskList
                        invalidateData={{setInvalidate: setInvalidateDataState, invalidate: invalidateDataState}}
                        style={styles.taskList}
                        limitedDay={new Date().toISOString().split('T')[0]}
                        dashboardText={true}
                    />

                </ScrollView>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    main: {
        marginTop: 40,
    },
    cardWrapper: {
        backgroundColor: COLORS.primaryLight,
        justifyContent: "space-between",
    },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 20,
        paddingVertical: 18,
        marginBottom: 10,
    },
    contentWrapper: {
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
    },
    taskList: {
        paddingBottom: 40,
    },
});
