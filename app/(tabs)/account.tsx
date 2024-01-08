import { StyleSheet, View } from 'react-native';
import { useTranslation } from "react-i18next";
import { useAuthContext } from '../../authentication/AuthProvider';
import { ScrollView } from 'react-native-gesture-handler';
import { FocusedStatusBar, HeaderSubtitle, Heading2, HorizontalLine } from '../../components';
import { containerStyle } from '../../constants/styles';
import EmailForm from '../../components/forms/EmailForm';
import SecondaryButton from '../../components/buttons/SecondaryButton';

export default function account () {
    const { t } = useTranslation();
    const path = "users";
    const authContext = useAuthContext();

    return (
        <View style={containerStyle.wrapper}>
            <View style={containerStyle.container}>
                <FocusedStatusBar />

                {/* SUBTITLE */}
                <HeaderSubtitle subtitle={ t("account-sub") } />

                <ScrollView style={styles.main}>
                    {/* CHANGE EMAIL */}
                    <View>
                        <Heading2>{ t("account-change-email") }</Heading2>
                        <EmailForm path={path} />
                    </View>
                    <HorizontalLine />

                    {/* LOGOUT */}
                    <SecondaryButton
                        title={ t("btn-logout") }
                        handlePress={authContext?.logout}
                    />
                </ScrollView>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    main: {
        marginTop: 32,
    },
});
