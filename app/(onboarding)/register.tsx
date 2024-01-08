import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { useAuthContext } from '../../authentication/AuthProvider';
import { AuthType, ButtonType, FormMethods, SizeOptions } from '../../types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { containerStyle } from '../../constants/styles';
import { ButtonWithSubText, ErrorElement, FocusedStatusBar, HeaderSubtitle, InputField, Loader } from '../../components';
import { useForm, useMutation } from '../../core/hooks';
import { registerWithMailSchema } from '../../constants/functional';
import { API_URL } from "@env"

const defaultData = {
    email: "",
    password: "",
};

export default function register () {
    const { t } = useTranslation();
    const path = "register";
    const authContext = useAuthContext();
    const [errorField, setErrorField] = useState("");
    const { isLoading, error, mutate } = useMutation();
    const { values, errors, handleChange } = useForm(registerWithMailSchema, {
        ...defaultData,
    });

    // empty error field if values change again
    useEffect(() => {
        setErrorField("");
    }, [values]);

    const registerUser = async () => {
        const data = values;
        mutate(`${API_URL}/${path}`, {
            method: FormMethods.post,
            data,
            jsonOnSuccess: (json: AuthType) => {
                authContext?.login(json);
            },
            onError: () => {
                setErrorField(t("error-fill-all"));
            }
        });
    };

    if (isLoading) {
        return <Loader size={SizeOptions.large} />;
    }

    if (error || Object.keys(errors).length > 0) {
        !errorField && setErrorField(t("error-fill-all"));
    }

    return (
        <View style={containerStyle.onBoardingWrapper}>
            <View style={containerStyle.container}>
                <FocusedStatusBar />
                <HeaderSubtitle subtitle={ t("register-sub") } />
                <KeyboardAvoidingView behavior="padding" style={styles.main}>

                    {/* EMAIL */}
                    <InputField onChange={(value) => handleChange(value, "email")} value={ values.email } label={ t("input-email") } placeholder={ t("placeholder-email") } />
                    
                    {/* PASSWORD */}
                    <InputField onChange={(value) => handleChange(value, "password")} value={ values.password } isSecret={true} label={ t("input-password") } placeholder={ t("placeholder-password") } />
                </KeyboardAvoidingView>

                {/* ERROR */}
                { errorField && (
                    <ErrorElement title={errorField} />
                ) }
            </View>

            {/* SUBMIT BUTTON */}
            <ButtonWithSubText handlePress={registerUser} title={ t("btn-register") } subText={ t("subtext-login-text") } linkButtonProps={{screen: "/login"}} buttonTitle={ t("subtext-login-url") } buttonType={ ButtonType.warning } />
        </View >
    );
}

const styles = StyleSheet.create({
    main: {
        marginTop: 44,
        gap: 16,
    },
    filter: {
        marginTop: 32,
    },
});
