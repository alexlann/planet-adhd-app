import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import { useTranslation } from 'react-i18next';
import Svg, { Circle } from "react-native-svg"
import { UserLevelType } from '../../types';
import { useUserLevel } from '../../authentication/AuthProvider';
import * as Progress from 'react-native-progress';
import levelPercentage from '../../core/maths/levelPercentage';
import { COLORS, FONTS, SIZES } from '../../constants';

const Level = ({ style, size=75, levelUp=false, updatedUserLevel } : { style?: ViewStyle, size?: number, levelUp?: boolean, updatedUserLevel?: boolean | UserLevelType }) => {
    const { t } = useTranslation();
    const userLevel = updatedUserLevel && typeof updatedUserLevel !== "boolean" ? updatedUserLevel : useUserLevel();

    // calculate data needed for progress chart
    const levelNumber = userLevel?.level?.levelNumber as number;
    const percentage: number = levelUp ? 100 : levelPercentage(userLevel as UserLevelType);
    const percentageText = `${percentage}%`;
    const radio = size - 5;
    const circleLength = 2 * Math.PI * (size-5)
    const strokeWidthBaseCircle = 6;
    const strokeWidthPercentageCircle = 12;
    
    return (
            <View style={style}>
                {/* PROGRESS CIRCLE */}
                <View style={[styles.wrapper, {height: size*2, width: size*2 }]}>
                    {/* STANDARD CIRCLE */}
                    <Svg style={styles.svg}>
                        <Circle
                            cx={size}
                            cy={size}
                            r={radio}
                            stroke={COLORS.lightGray}
                            strokeWidth={strokeWidthBaseCircle}
                            fill="transparent"
                            strokeDasharray={circleLength}
                            strokeDashoffset={0}
                        />
                    </Svg>

                    {/* PERCENTAGE CIRLCE */}
                    <Progress.Circle
                        size={size*2}
                        progress={percentage/100}
                        borderWidth={0}
                        color={COLORS.secondary}
                        thickness={strokeWidthPercentageCircle}
                        strokeCap={'round'}
                        style={styles.progressCircle}
                        animated={false}
                    />

                    {/* CONTENT */}
                    <View style={styles.content}>
                        {/* PERCENTAGE */}
                        <Text style={[styles.percentage, {fontSize: !levelUp ? SIZES.extraLarge : 42}]}>
                            { !levelUp ? percentageText : levelNumber - 1 }
                        </Text>

                        {/* TEXT */}
                        <Text style={styles.level}>
                            { t("progress-level") } { !levelUp && levelNumber }
                        </Text>
                    </View>
                </View>
            </View>
    )
}

export default Level;

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        position: "relative",
    },
    svg: {
        alignSelf: "center",
        position: "absolute",
        transform: [
            {rotateZ: "270deg"},
            {rotateX: "0deg"},
            {rotateY: "0deg"}
        ],
    },
    level: {
        color: COLORS.darkGray,
        fontSize: SIZES.small,
        textAlign: "center",
        fontFamily: FONTS.regular,
    },
    percentage: {
        color: COLORS.black,
        fontWeight: "bold",
        textAlign: "center",
        fontFamily: FONTS.bold,
    },
    content: {
        position: "absolute",
    },
    progressCircle: {
        position: "absolute"
    },
});