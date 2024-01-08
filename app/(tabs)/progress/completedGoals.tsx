import { useTranslation } from "react-i18next";
import { StyleSheet, View } from 'react-native';
import { COLORS, SHADOWS, SIZES } from '../../../constants';
import { containerStyle } from "../../../constants/styles";
import { FocusedStatusBar, GoalList, HeaderSubtitle } from "../../../components";
import { SizeOptions } from "../../../types";

export default function CompletedGoalsScreen() {
    const { t } = useTranslation();

    return (
        <View style={containerStyle.wrapper}>
            <View>
                <View style={containerStyle.container}>
                    <FocusedStatusBar />

                    {/* SUBTITLE */}
                    <HeaderSubtitle subtitle={ t("completed-goals-sub") } />
                    
                    <View style={styles.main}>
                        {/* GOAL LIST */}
                        <GoalList scroll={true} size={SizeOptions.small} style={styles.goalList} queryCompleted={true} />
                    </View>
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    main: {
        marginTop: 32,
        paddingBottom: 168,
    },
    goalList: {
        paddingVertical: 20,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.large,
        ...SHADOWS.drop
    },
});
