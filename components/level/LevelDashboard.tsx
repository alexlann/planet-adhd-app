import { StyleSheet, View, Text } from 'react-native';
import { useTranslation } from "react-i18next";
import { ButtonType, UserLevelType } from '../../types';
import SecondaryButton from '../buttons/SecondaryButton';
import { useUserLevel } from '../../authentication/AuthProvider';
import * as Progress from 'react-native-progress';
import levelPercentage from '../../core/maths/levelPercentage';
import { DIMENSIONS, buttonStyle } from '../../constants/styles';
import { COLORS, FONTS, SIZES } from '../../constants';

const LevelDashboard = () => {
    const { t } = useTranslation();
    const userLevel = useUserLevel();
    const progressBarWidth = DIMENSIONS.width*0.9*0.9;
    const percentage = levelPercentage(userLevel as UserLevelType);
    const percentageText = `${percentage}%`;

    return (
        <>
            <Text style={styles.level}>{ t("progress-level") } { userLevel?.level.levelNumber || 1 }</Text>

            {/* PROGRESS BAR */}
            <View style={styles.outerBar}>
                <Progress.Bar
                    progress={percentage/100}
                    width={progressBarWidth}
                    height={SIZES.medium + SIZES.extraSmall}
                    color={COLORS.primaryDark}
                    borderRadius={SIZES.extraLarge}
                    unfilledColor={COLORS.primaryMiddle}
                    borderWidth={0}
                />
                <Text style={styles.percentage}>{percentageText}</Text>
            </View>

            {/* GO TO PROGRESS PAGE */}
            <View style={buttonStyle.goToButton}>
                <SecondaryButton
                    title={t("btn-link-progress")}
                    arrow="right"
                    type={ButtonType.primary}
                    linkButtonProps={{
                        screen: "/progress",
                    }} />
            </View>
        </>
    );
}

export default LevelDashboard;

const styles = StyleSheet.create({
    outerBar: {
        width: "100%",
        position: "relative",
    },
    level: {
        color: COLORS.darkGray,
        fontSize: SIZES.small,
        marginBottom: SIZES.extraSmall/2,
        fontFamily: FONTS.regularText,
    },
    percentage: {
        color: COLORS.white,
        fontWeight: "bold",
        fontSize: SIZES.small,
        lineHeight: SIZES.medium,
        position: "absolute",
        left: 0,
        top: 0,
        marginVertical: SIZES.extraSmall/2,
        marginHorizontal: SIZES.medium*2,
        fontFamily: FONTS.boldText,
    },
});
