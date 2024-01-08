import { View, StyleSheet } from 'react-native'
import InputField from '../forms/item/InputField';
import { useTranslation } from 'react-i18next';
import { FormMethods, SizeOptions } from '../../types';
import { useUser } from '../../authentication/AuthProvider';
import { useEffect, useState } from 'react';
import Loader from '../loader/Loader';
import { useForm, useMutation } from '../../core/hooks';
import { emailFormSchema } from '../../constants/functional';
import ErrorElement from '../notices/ErrorElement';
import { SIZES } from '../../constants';
import SecondaryButton from '../buttons/SecondaryButton';
import { API_URL } from "@env"

const defaultData = {
    email: "",
};

const EmailForm = ({ path } : { path: string }) => {
    const { t } = useTranslation();
    const user = useUser();
    const [disabled, setDisabled] = useState(false);
    const [defaultDataIsEdited, setDefaultDataIsEdited] = useState(false)
    const [errorField, setErrorField] = useState("");
    const { isLoading, error, mutate } = useMutation();
    const { values, errors, handleChange } = useForm(emailFormSchema, {
        ...defaultData,
    });

    // handle errors and empty fields
    useEffect(() => {
        if(!isLoading) {
            if(!defaultDataIsEdited) {
                // set user email as default data
                values.email = user?.email as string;
                setDefaultDataIsEdited(true);
            }

            // disable button if form empty
            if(values.email === "") {
                setDisabled(true);
                setErrorField(`${t("account-email-title")} ${t("error-cannot-be-empty")}`);
            } else {
                setDisabled(false);
                setErrorField("");
            }
        }
    }, [isLoading, values]);

    const handleSave = () => {
        const email = values.email;

        // if email is empty, throw error
        if (!email) {
            setErrorField(`${t("account-email-title")} ${t("error-cannot-be-empty")}`)
            return;
        }

        mutate(`${API_URL}/${path}/${user?.id}`, {
            method: FormMethods.patch,
            data: {
                email: email,
            },
        });
    }

    // handle errors and loading
    if (isLoading) {
        return <Loader size={SizeOptions.small} />;
    }

    if (error || Object.keys(errors).length > 0) {
        !errorField && setErrorField(t("error-fill-all"));
    }


    return (
        <>
            {/* EMAIL INPUT */}
            <InputField
                onChange={(value) => handleChange(value, "email")}
                value={ values.email }
                label={ t("input-email") }
                placeholder={ t("placeholder-email") }
            />

            {/* ERROR */}
            { errorField && (
                <ErrorElement title={errorField} />
            ) }
            
            {/* SUBMIT BUTTON */}
            <View style={styles.btnWrapper}>
                <SecondaryButton disabled={disabled} handlePress={handleSave} title={ t("btn-save") } />
            </View>
        </>
    )
}

export default EmailForm;


const styles = StyleSheet.create({
    btnWrapper: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: SIZES.small,
        marginRight: SIZES.extraSmall,
    },
});