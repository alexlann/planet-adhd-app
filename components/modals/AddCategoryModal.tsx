import { useTranslation } from "react-i18next";
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import Icon from "../visualElements/Icon";
import InputField from "../forms/item/InputField";
import { ButtonType, CategoryType, FormMethods, IconOptions, SizeOptions } from "../../types";
import PrimaryButton from "../buttons/PrimaryButton";
import Heading2 from "../typography/Heading2";
import { useEffect, useState } from "react";
import SecondaryButton from "../buttons/SecondaryButton";
import Loader from "../loader/Loader";
import { useForm, useMutation } from "../../core/hooks";
import { DIMENSIONS, containerStyle, modalStyle } from "../../constants/styles";
import { COLORS, SIZES } from "../../constants";
import ErrorElement from "../notices/ErrorElement";
import { addCategoryModalSchema, colorOptionsCategory, iconOptionsCategory } from "../../constants/functional";
import RadioBoxes from "../forms/RadioBoxes";
import { API_URL } from "@env"

const defaultData = {
    title: "",
    color: colorOptionsCategory[0].color,
    icon: iconOptionsCategory[0].icon.icon,
};

const AddCategoryModal = ({ modal, setModal, setCategoryId, invalidate, category } : { modal: boolean, setModal: (args0: boolean) => void, setCategoryId?: (args0: number) => void, invalidate: (args: boolean | number | string) => void, category?: CategoryType }) => {
    const { t } = useTranslation();
    const path = "categories";
    const [errorField, setErrorField] = useState("");
    const [defaultDataIsEdited, setDefaultDataIsEdited] = useState(false);
    const [disabled, setDisabled] = useState(true)
    const { isLoading, error, mutate } = useMutation();
    const { values, errors, handleChange } = useForm(addCategoryModalSchema, {
        ...defaultData,
    });

    // MUTATIONS
    // if category passed to element, patch category, else save new category
    const handleSave = () => {
        const url = `${API_URL}/${path}${category ? `/${category.id}` : ""}`;
        if(!disabled) {
            mutate(url, {
                method: category ? FormMethods.patch : FormMethods.post,
                data: values,
                onSuccess: () => {
                    closeModal();
                    setDisabled(true)
                    setDefaultDataIsEdited(false);
                    // set to default data
                    values.title = defaultData.title;
                    values.color = defaultData.color;
                    values.icon = defaultData.icon;
                },
                jsonOnSuccess: (json: any) => {
                    invalidate(`${json.id}-${Math.random()}`);
                    setCategoryId && setCategoryId(json.id);
                },
                onError: () => setErrorField( t("error-something-wrong") ),
            });
        } else {
            setErrorField( t("error-fill-all") );
        }
    };

    // if category passed to element, delete category when button clicked and set category to "no category"
    const handleDelete = () => {
        if(category) {
            mutate(`${API_URL}/${path}/${category.id}`, {
                method: FormMethods.delete,
                onSuccess: () => {
                    closeModal();
                    invalidate(`${category.id}-${Math.random()}`);
                    setDefaultDataIsEdited(false);
                    setCategoryId && setCategoryId(0);
                    // set to default data
                    values.title = defaultData.title;
                    values.color = defaultData.color;
                    values.icon = defaultData.icon;
                },
                onError: () => setErrorField( t("error-something-wrong") ),
            });
        }
    };
    
    // FUCNTIONS
    // empty error field if values change again
    useEffect(() => {
        setErrorField("");
    }, [values, category, invalidate]);

    // fill in fetched data if category passed and form is not yet edited
    useEffect(() => {
        if (!defaultDataIsEdited && category) {
            setDefaultDataIsEdited(true);
            values.title = category.title;
            values.color = category.color;
            values.icon = category.icon;
        };
    }, [category, values, invalidate]);

    // disable/enable button if title is (not) filled in
    useEffect(() => {
        if(!values["title"]) {
            setDisabled(true);
        }
        if(values["title"]) {
            setDisabled(false);
        }
    }, [values, category, invalidate]);

    // closeModal
    const closeModal = () => {
        setModal(false)
    };

    // handle fetch and errors
    if (isLoading) {
        return <Loader size={SizeOptions.medium} />
    }

    if (error || Object.keys(errors).length > 0) {
        !errorField && setErrorField(t("error-fill-all"));
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={!!modal}
            statusBarTranslucent={true}
            onRequestClose={closeModal}
        >
            <View style={modalStyle.dimBackground}>
                <View style={modalStyle.positionWrappper}>
                    <View style={styles.cardWrapper}>
                        <View style={[containerStyle.container, styles.containerWidth]}>

                            {/* CLOSE BUTTON */}
                            <Pressable style={styles.closeButton} onPress={closeModal} disabled={false}>
                                <Icon size={SIZES.large} icon={IconOptions.close} color={COLORS.darkGray} />
                            </Pressable>

                            <View style={styles.main}>
                                <View style={styles.headingWrapper}>
                                    <Heading2>{ t("category-add-title") }</Heading2>
                                    {/* DELETE BUTTON */}
                                    {/* if existing category, show delete button */}
                                    { category && (
                                        <SecondaryButton title={ t("btn-delete") } type={ButtonType.danger} handlePress={handleDelete} />
                                    )}
                                </View>
                                <View style={styles.formWrapper}>
                                    {/* TITLE */}
                                    <InputField
                                        value={values.title}
                                        label={ t("input-category-title") }
                                        labelIndent={false}
                                        onChange={(value) => handleChange(value, "title")}
                                        placeholder={ t("placeholder-category-title") }
                                    />

                                    {/* COLORS */}
                                    <RadioBoxes value={values.color} title="color" data={colorOptionsCategory} onPress={(value) => handleChange(value, "color")} />

                                    {/* ICON */}
                                    <RadioBoxes color={values.color} value={values.icon} title="icon" data={iconOptionsCategory} onPress={(value) => handleChange(value, "icon")} />

                                    {/* ERROR */}
                                    { errorField && (
                                        <View style={styles.errorWrapper}>
                                            <ErrorElement title={errorField} />
                                        </View>
                                    ) }

                                    {/* SAVE BUTTON */}
                                    <PrimaryButton title={ t("btn-save") } disabled={disabled} handlePress={handleSave} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Modal >
    );
}

export default AddCategoryModal;

const styles = StyleSheet.create({
    headingWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: SIZES.medium,
        alignItems: "baseline",
    },
    cardWrapper: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: SIZES.medium,
        borderTopRightRadius: SIZES.medium,
        width: DIMENSIONS.width,
        height: DIMENSIONS.height / 5 * 4,
        position: "relative",
        paddingBottom: SIZES.extraLarge,
    },
    containerWidth: {
        width: "85%",
        paddingTop: 10,
    },
    closeButton: {
        marginLeft: "auto",
    },
    main: {
        justifyContent: "space-between",
        height: "100%",
        paddingBottom: SIZES.extraLarge,
        gap: SIZES.font,
    },
    formWrapper: {
        gap: SIZES.font,
    },
    errorWrapper: {
        marginTop: -52,
        marginBottom: -SIZES.small,
    },
});