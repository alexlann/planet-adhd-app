import { StyleSheet, View } from 'react-native';
import { useTranslation } from "react-i18next";
import { SizeOptions } from '../../types';
import { useEffect, useState } from "react";
import { buttonStyle, containerStyle } from '../../constants/styles';
import { FocusedStatusBar, GoalList, HeaderSubtitle, PlusButton } from '../../components';
import { useGlobalSearchParams } from 'expo-router';

export default function goals() {
    const { t } = useTranslation();
    const [isEmpty, setIsEmpty] = useState(true);
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
            <FocusedStatusBar />
            <View style={styles.main}>
                <View style={containerStyle.container}>
                    {/* SUBTITLE */}
                    <View style={styles.headerWrapper}>
                        <HeaderSubtitle subtitle={ t("goals-sub") } />
                    </View>

                    {/* GOAL LIST */}
                    <GoalList
                        scroll={true}
                        style={styles.goalList}
                        invalidateData={invalidateDataState}
                        queryCompleted={false}
                        size={SizeOptions.large}
                        sizeNothingHere={SizeOptions.large}
                        setIsEmpty={setIsEmpty}
                    />
                </View>

                {/* PLUSBUTTON */}
                {/* show plusbutton only if goals were found */}
                { !isEmpty && (
                    <View style={[containerStyle.container, buttonStyle.buttonContainer]}>
                        <PlusButton linkButtonProps={{ screen: "/goals/add" }} />
                    </View>
                )}
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    headerWrapper: {
        marginBottom: 32
    },
    goalList: {
        paddingBottom: 200,
    },
    main: {
        position: "relative",
        height: "100%",
    },
});
