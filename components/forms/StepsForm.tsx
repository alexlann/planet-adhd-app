import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useAuthContext } from '../../authentication/AuthProvider';
import { FormMethods, InputOptions, LinkButtonPropsType, SizeOptions } from '../../types';
import HeaderSubtitle from '../typography/HeaderSubtitle';
import InputField from './item/InputField';
import Tags from './Tags';
import { useForm, useMutation } from '../../core/hooks';
import { router } from 'expo-router';
import ErrorElement from '../notices/ErrorElement';
import Loader from "../loader/Loader"
import { DIMENSIONS, containerStyle } from '../../constants/styles';
import CardItems from './CardItems';
import DateTimePicker from './DateTimePicker';
import ProgressNav from '../buttons/ProgressNav';
import { API_URL } from "@env"

export default function StepsForm({schema, inputFields, defaultData, path, formTitle, navigationProps} : {schema: any, inputFields: any, defaultData: any, path: string, formTitle: string, navigationProps: LinkButtonPropsType}) {
    const { t } = useTranslation();
    const authContext = useAuthContext();
    const [errorField, setErrorField] = useState("");
    const [disabled, setDisabled] = useState(false);
    const { isLoading, error, mutate } = useMutation();
    const [currentStep, setCurrentStep] = useState(0);
    const totalSteps = Object.keys(inputFields).length;
    const [formData, setformData] = useState({user: authContext?.auth?.user.id});
    const [label, setLabel] = useState(t(`input-${formTitle}-${inputFields[currentStep].title}`));
    const [placeholder, setPlaceholder] = useState(t(`placeholder-${formTitle}-${inputFields[currentStep].title}`));

    const { values, errors, handleChange } = useForm(schema, {
        ...defaultData,
    });

    // FUNCTIONS
    // set button dis/enabled
    useEffect(() => {
        const currentValue = values[inputFields[currentStep].title];
        if(!currentValue && currentValue !== 0  && inputFields[currentStep].title !== "notes") {
            setDisabled(true);
        }

        if(currentValue || currentValue === 0  || inputFields[currentStep].title === "notes") {
            setDisabled(false);
            // empty error field if values is not empty
            setErrorField("");
        }

    }, [values, currentStep]);

    // handle button press
    const handlePress = () => {
        // get value and title current inputField
        const inputFieldTitle = inputFields[currentStep].title;
        const inputValue = values[inputFieldTitle];

        // If input value is not empty, go to next step, else, show error message
        if (inputValue !== "" || inputFieldTitle === "notes") {
            // save value current inputField
            const formValue: any = {};
            // task can be part of no category or goal, which is id 0
            if (inputFieldTitle === "category" || inputFieldTitle === "goal") {
                formValue[`${inputFieldTitle}`] = inputValue <= 0 ? null : inputValue;
            // manually add stoptime and startTime
            } else if (inputFieldTitle === "startTime") {
                formValue.startTime = values.startTime;
                formValue.stopTime = values.stopTime;
            } else {
                formValue[`${inputFieldTitle}`] = inputValue;
            }

            // update stepCount
            const updatedStepCount = currentStep + 1;

            if (updatedStepCount === totalSteps) {
                const data = {...formData, ...formValue};

                mutate(`${API_URL}/${path}`, {
                    method: FormMethods.post,
                    data,
                    jsonOnSuccess: (json: any) => router.replace({pathname: navigationProps.screen, params: { invalidateData: json.id }})

                });
            } else {
                setCurrentStep(updatedStepCount);
                setLabel(t(`input-${formTitle}-${inputFields[updatedStepCount].title}`));
                setPlaceholder(t(`placeholder-${formTitle}-${inputFields[updatedStepCount].title}`));

                // add formvalue to formdata
                setformData({...formData, ...formValue});
                setDisabled(true);
            }
        } else {
            setErrorField( `${t(`input-${formTitle}-${inputFieldTitle}`)} ${t("error-cannot-be-empty")}` );
        }
    };

    // handle isLoading and error
    if (isLoading) {
        return <Loader size={SizeOptions.large} />;
    }

    if (error || Object.keys(errors).length > 0) {
        !errorField && setErrorField(t("error-fill-all"));
    }

    return (
        <View>
            <View style={containerStyle.container}>
                <HeaderSubtitle subtitle={ t(`${path}-add-sub-${inputFields[currentStep].title}`) } />
                <KeyboardAvoidingView behavior="padding" style={styles.main}>
                    <FlatList
                        data={inputFields}
                        renderItem={({ item, index }) => (
                            index === currentStep

                            // TITLE, REWARD, NOTES
                            ? item.type === InputOptions.text
                                ? <InputField onChange={(value) => handleChange(value, item.title)} value={ values[`${item.title}`] } label={ label } placeholder={ placeholder } multiline={item.title === "notes"} />
                                
                                // TAGS
                                : item.type === InputOptions.tags
                                ? <Tags value={ values[`${item.title}`] } onPress={(value) => handleChange(value, item.title)} />

                                // CATEGORIES
                                : item.type === InputOptions.categories
                                ? <CardItems value={ values[`${item.title}`] } path={"categories"} onPress={(value: string | number) => handleChange(value, item.title)} />
                                
                                // GOALS
                                : item.type === InputOptions.goal
                                ? <CardItems value={ values[`${item.title}`] } path={"goals"} onPress={(value: string | number) => handleChange(value, item.title)} />

                                // STARTTIME
                                : item.type === InputOptions.startTime
                                ? <DateTimePicker handleChange={handleChange} startTime={values.startTime} stopTime={values.stopTime} />

                                : <></>
                            : <></>
                        )}
                        keyExtractor={(item, index) => `${index}`}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={true}
                    />
                    { errorField && (
                        <ErrorElement title={errorField} />
                    ) }
                </KeyboardAvoidingView>
            </View>
            <View style={styles.progressNav}>
                <ProgressNav
                    disabled={disabled}
                    totalSteps={totalSteps}
                    currentStepState={{currentStep, setCurrentStep}}
                    onPress={handlePress}
                />
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    main: {
        paddingTop: 40,
        height: DIMENSIONS.height - 311,
        paddingBottom: 40,
    },
    progressNav: {
        position: "absolute",
        top: DIMENSIONS.height - 244,
        left: 0,
        width: DIMENSIONS.width,
    },
});
