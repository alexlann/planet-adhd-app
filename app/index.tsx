import { Image, ImageStyle, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { DIMENSIONS, containerStyle } from '../constants/styles';
import { FocusedStatusBar, HorizontalLine, PrimaryButton } from '../components';
import { COLORS, SIZES } from '../constants';

export default function index () {
    const { t } = useTranslation();

    return (
        <View style={containerStyle.onBoardingWrapper}>
            <View style={containerStyle.container}>
                <FocusedStatusBar />
            </View>

            {/* LOGO */}
            <View>
                <Image
                    style={styles.logo as ImageStyle}
                    source={require("../assets/images/logo.png")}
                />
            </View>


            <View style={styles.buttonsWrapper}>
                <View style={styles.buttonsContainer}>
                    {/* REGISTER */}
                    <PrimaryButton title={ t("btn-register-email") } linkButtonProps={{screen: "/register"}} />
                    
                    <HorizontalLine or={true} />
                    
                    {/* LOGIN */}
                    <PrimaryButton title={ t("subtext-login-url") } linkButtonProps={{screen: "/login"}} />
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    logo: {
        width: DIMENSIONS.width * 0.7,
        marginLeft: "auto",
        marginRight: "auto",
        resizeMode: "center",
    },
    buttonsWrapper: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: SIZES.medium,
        borderTopRightRadius: SIZES.medium,
        height: "30%",
    },
    buttonsContainer: {
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        flex: 1,
        marginTop: 32,
        rowGap: 16,
    },
});
