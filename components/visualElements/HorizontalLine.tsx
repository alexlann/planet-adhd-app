import { View, StyleSheet, Text } from 'react-native'
import { COLORS, FONTS, SIZES } from '../../constants';
import { useTranslation } from 'react-i18next';

const HorizontalLine = ({ or }: { or?: boolean }) => {
    const { t } = useTranslation();

    return (
        or ? (
            <View style={styles.wrapper}>
                <View style={styles.horline}></View>
                <Text style={styles.or}>{ t("line-or") }</Text>
                <View style={styles.horline}></View>
            </View>
        ) : (
            <View style={[styles.horline, styles.horlineSingle ]}></View>
        )
        
    )
}

export default HorizontalLine;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 15,
        maxHeight: 24,
    },
    horline: {
        width: "40%",
        height: 1,
        backgroundColor: COLORS.darkGray,
        borderRadius: SIZES.small / 2,
    },
    horlineSingle: {
        width: "100%",
        backgroundColor: COLORS.PrimaryLightBorder,
        marginTop: SIZES.small,
        marginBottom: 25,
    },
    or: {
      textTransform: 'lowercase',
      color: COLORS.lightBlack,
      fontFamily: FONTS.regular,
      lineHeight: 22,
      fontSize: 22,
    }
});
