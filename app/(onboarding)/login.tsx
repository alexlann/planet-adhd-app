import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { useAuthContext } from '../../authentication/AuthProvider';
import { AuthType, ButtonType, FormMethods, SizeOptions } from '../../types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { containerStyle } from '../../constants/styles';
import { ButtonWithSubText, ErrorElement, FocusedStatusBar, HeaderSubtitle, InputField, Loader } from '../../components';
import { loginWithMailSchema } from '../../constants/functional';
import { useForm, useMutation } from '../../core/hooks';
import { API_URL } from "@env"

const defaultData = {
    email: "",
    password: "",
};

export default function login () {
    const { t } = useTranslation();
    const authContext = useAuthContext();
    const path = "login";
    const { isLoading, error, mutate } = useMutation();
    const [errorField, setErrorField] = useState("");
    const { values, errors, handleChange } = useForm(loginWithMailSchema, {
        ...defaultData,
    });

    useEffect(() => {
        setErrorField("");
    }, [values]);

    // login
    const loginUser = async () => {
        const data = values;
        mutate(`${API_URL}/${path}`, {
            method: FormMethods.post,
            data,
            jsonOnSuccess: (json: AuthType) => {
                authContext?.login(json);
            },
            onError: () => {
                setErrorField(t("error-email-password"));
            }
        });
    }


    // handle isLoading and error
    if (isLoading) {
        return <Loader size={SizeOptions.large} />;
    }

    if (error || Object.keys(errors).length > 0) {
        !errorField && setErrorField(t("error-something-wrong"));
    }

    return (
        <View style={containerStyle.onBoardingWrapper}>
            <View style={containerStyle.container}>
                <FocusedStatusBar />
                <HeaderSubtitle subtitle={ t("login-sub") } />
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
            <ButtonWithSubText handlePress={loginUser} title={ t("btn-login") } subText={ t("subtext-register-text") } linkButtonProps={{ screen: "/register" }} buttonTitle={t("subtext-register-url")} buttonType={ButtonType.warning} />
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
