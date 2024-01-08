import { View, StyleSheet, ViewStyle, Text, Image } from 'react-native'
import { ButtonType, FetchItemOptions, LinkButtonPropsType, SizeOptions } from '../../types';
import PrimaryButton from '../buttons/PrimaryButton';
import { useTranslation } from 'react-i18next';
import { COLORS, FONTS, SIZES } from '../../constants';

const NothingHere = ({ buttonProps, style, size=SizeOptions.small, itemType } : { buttonProps?: LinkButtonPropsType, style?: ViewStyle, size?: SizeOptions, itemType: FetchItemOptions | "dashboardTask" }) => {
    const { t } = useTranslation();

    // RETURN
    return (
        <View style={[styles.main, size === SizeOptions.large && styles.mainLarge, style && style]}>

            {/* IMAGE */}
            {size === SizeOptions.large && (
                <Image
                    style={styles.image}
                    source={require('../../assets/images/empty.png')}
                />
            )}

            {/* CONTENT */}
            <View style={styles.content}>
                { size === SizeOptions.large && (
                    <Text style={styles.title}>{ t("nothing-yet-title") }</Text>
                )}
                <Text style={styles.subTitle}>{ t(`empty-${itemType}`) }</Text>
            </View>

            {/* BUTTON */}
            { buttonProps
            && (
                <View style={size === SizeOptions.large && styles.buttonWrapper}>
                    <PrimaryButton title={ t(`btn-create-${itemType}`) } type={ButtonType.primary} size={SizeOptions.small} linkButtonProps={buttonProps} />
                </View>
            ) }
        </View>
    )
}

export default NothingHere;

const styles = StyleSheet.create({
    main: {
        alignItems: "center",
        gap: 10,
        width: "100%",
        paddingHorizontal: 12,
        paddingVertical: 7,
        fontFamily: FONTS.regular,
        marginBottom: SIZES.font,
    },
    mainLarge: {
        justifyContent: "center",
        height: "90%",
    },
    content: {
        alignItems: "center",
        gap: 5,
    },
    title: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.medium,
        color: COLORS.lightButton,
    },
    subTitle: {
        fontSize: SIZES.font,
        fontFamily: FONTS.regular,
        color: COLORS.lightButton,
        textAlign: "center",
        maxWidth: "85%",
    },
    image: {
        width: "50%",
        resizeMode: 'center',
        height: "20%",
        marginBottom: SIZES.small,
    },
    buttonWrapper: {
        marginTop: SIZES.small,
    }
});