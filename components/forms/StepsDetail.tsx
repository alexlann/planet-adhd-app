import {  StyleSheet, Text, View } from 'react-native';
import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';
import { FormMethods, LinkButtonPropsType, SizeOptions } from '../../types';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useFetch, useForm, useMutation } from '../../core/hooks';
import { router } from 'expo-router';
import { containerStyle } from '../../constants/styles';
import Reward from '../rewards/Reward';
import { COLORS, FONTS, SIZES } from '../../constants';
import Tags from './Tags';
import DateTimePicker from './DateTimePicker';
import CardItems from './CardItems';
import ErrorElement from '../notices/ErrorElement';
import HeaderSubtitle from '../typography/HeaderSubtitle';
import InputField from '../forms/item/InputField';
import Loader from '../loader/Loader';
import PrimaryButton from '../buttons/PrimaryButton';
import { API_URL } from "@env"

export default function StepsDetail({ path, formTitle, defaultData, id, navigationProps, schema, inputFields } : { path: string, formTitle: string, defaultData: any, id: number, navigationProps: LinkButtonPropsType, schema: any, inputFields: any }) {
    const { t } = useTranslation();
    const [errorField, setErrorField] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [defaultDataIsEdited, setDefaultDataIsEdited] = useState(false)
    const { isLoading: mutateIsLoading, error: mutateError, mutate } = useMutation();

    const {
        data,
        error: fetchError,
        isLoading: fetchIsLoading,
    } = useFetch(`/${path}/${id}`);
    
    const { values, handleChange, errors: useFormError } = useForm(schema, {
        ...defaultData,
    });


    // FUNCTIONS
    useEffect(() => {
        if (!fetchIsLoading && !fetchError) {
            // fill fields with data from fetch
            if (!defaultDataIsEdited) {
                // change data only once
                setDefaultDataIsEdited(true);
                values.title = data.title;
                values.reward = data.reward;
                values.startTime = data.startTime;
                values.stopTime = data.stopTime;
                values.notes = data.notes;

                if(path === "tasks") {
                    values.importance = data.importance;
                    values.category = data.category ? data.category.id : 0;
                    values.goal = data.goal ? data.goal.id : 0;
                    values.status = data.status;
                    values.completed = data.completed;
                }
            }
            // set button dis/enabled
            if(values.title || values.reward) {
                setDisabled(false);
                // empty error field if values is not empty
                setErrorField("");
            }

            // if empty title or reward, set error
            if(!values.title || !values.reward) {
                setDisabled(true);
                setErrorField(t("error-fill-all"));
            }
        }
    }, [data, fetchIsLoading, fetchError, values]);

    // handle button press
    const handlePress = () => {
        if (values.title !== "" && values.reward !== "") {
            // task with category/goalId 0 is part of no category/goal
            if(inputFields.includes("category")) {
                values.category = values.category <= 0 ? null : values.category;
            };
            if(inputFields.includes("goal")) {
                values.goal = values.goal <= 0 ? null : values.goal;
            };

            mutate(`${API_URL}/${path}/${id}`, {
                method: FormMethods.patch,
                data: values,
                onSuccess: () => {
                    router.push({ pathname: navigationProps.screen, params: { invalidateData: `${id}-${Math.random()}`}})
                },
            });
        } else {
            setErrorField(t("error-fill-all"));
        }
    };

    // handle isLoading and errors
    if (fetchError || Object.keys(mutateError).length > 0 || Object.keys(useFormError).length > 0) {
        !errorField && setErrorField(t("error-fill-all"));
    }

    if (fetchIsLoading || mutateIsLoading) {
        return <Loader size={SizeOptions.large} />
    }

    return (
        <View>
            <View style={containerStyle.container}>
                <HeaderSubtitle subtitle={ t(`${path}-detail-sub`) } />
            </View>
            <ScrollView contentContainerStyle={styles.main}>
                <View style={containerStyle.container}>
                    {/* TITLE */}
                    { inputFields.includes("title") && (
                        <TextInput style={styles.title} onChangeText={(value) => handleChange(value, "title")} value={ values.title } placeholder={ t(`placeholder-${formTitle}-title`) } />
                    ) }
                    
                    {/* IMPORTANCE */}
                    { inputFields.includes("importance") && (
                        <Tags value={ values.importance } onPress={(value) => handleChange(value, "importance")} detailPage={true} />
                    ) }

                    {/* START AND STOPTIME */}
                    { inputFields.includes("startTime") && (
                        <DateTimePicker handleChange={handleChange} startTime={values.startTime} stopTime={values.stopTime} />
                    ) }
                    
                    {/* REWARD */}
                    { inputFields.includes("reward") && (
                        <View>
                            <Text style={styles.title}>{ t(`input-${formTitle}-reward`) }</Text>
                            <Reward type="input" onChange={(value) => handleChange(value, "reward")} value={ values.reward } placeholder={ t(`placeholder-${formTitle}-reward`) } />
                        </View>
                    )}

                    {/* NOTES */}
                    { inputFields.includes("notes") && (
                        <View>
                            <Text style={styles.title}>{ t(`input-${formTitle}-notes`) }</Text>
                            <InputField style={{marginTop: -SIZES.large, marginBottom: SIZES.large}} onChange={(value) => handleChange(value, "notes")} value={ values.notes } placeholder={ t(`placeholder-${formTitle}-notes`) } multiline={true} />
                        </View>
                    )}

                    {/* CATEGORY */}
                    { inputFields.includes("category") && (
                        <View style={{marginBottom: SIZES.extraSmall}}>
                            <CardItems value={ values.category } path={"categories"} onPress={(value) => handleChange(value, "category")} label={ t(`input-${formTitle}-category`) }  />
                        </View>
                    )}

                    {/* GOAL */}
                    { inputFields.includes("goal") && (
                        <CardItems value={ values.goal } path={"goals"} onPress={(value) => handleChange(value, "goal")} label={ t(`input-${formTitle}-goal`) } />
                    )}
                    
                    {/* ERROR */}
                    { errorField && (
                        <ErrorElement title={errorField} />
                    ) }
                </View>

            {/* SUBMIT BUTTON */}
            <View style={styles.buttonContainer}>
                <PrimaryButton title={ t("btn-save") } disabled={disabled} handlePress={handlePress} />
            </View>
        </ScrollView>
    </View>
    );
}

const styles = StyleSheet.create({
    title: {
        marginTop: SIZES.large,
        marginBottom: 14,
        fontSize: 22,
        fontFamily: FONTS.medium,
        color: COLORS.primary,
        lineHeight: 29,
    },
    main: {
        justifyContent: "space-between",
        gap: SIZES.font,
    },
    buttonContainer: {
        backgroundColor: COLORS.white,
        paddingBottom: 90,
        paddingLeft: "5%",
        paddingRight: "5%",
        paddingTop: SIZES.large,
        borderTopLeftRadius: SIZES.font,
        borderTopRightRadius: SIZES.font,
    },
});
