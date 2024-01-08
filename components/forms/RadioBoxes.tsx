import { StyleSheet, FlatList, Pressable, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../visualElements/Icon';
import { IconType } from '../../types';
import Label from '../typography/Label';
import { COLORS, SIZES } from '../../constants';

const RadioBoxes = ({ onPress, data, title, value, color } : { onPress: (args0: string, args1: string) => void, data: {}[], title: "icon" | "color", value: string, color?: string }) => {
    const { t } = useTranslation();
    const [checked, setChecked] = useState(value);
    
    const handlePress = (value: string | IconType) => {
        const stringValue = typeof value === "string" ? value : value.icon;
        onPress(stringValue, title);

        // set new value checked
        setChecked(stringValue);
    };

    useEffect(() => {
        setChecked(value);
    }, [value])
    

    return (
        <>
            {/* LABEL */}
            <Label indent={false}>{ t(`input-category-${title}`) }</Label>

            {/* RADIOBOXES */}
            <FlatList
                columnWrapperStyle={styles.colorBoxes}
                numColumns={5}
                data={data}
                renderItem={(item: any) => (
                    // RADIOBOX
                    <Pressable onPress={() => handlePress(item.item[title])} style={styles.boxWrapper}>
                        {({ pressed }) => (
                            <View style={[styles.outerCircle, {
                                borderColor: pressed || checked === item.item[title] || checked === item.item[title].icon ? COLORS.lightBlack : "transparent" }]}>
                                <View style={[styles.box, {backgroundColor: title === "color" ? item.item[title] : "transparent"}]}>
                                    {title === "icon" && (
                                        <Icon icon={item.item.icon} color={color || COLORS.lightBlack} />
                                    )}
                                </View>
                            </View>
                        )}
                    </Pressable>
                )}
                showsVerticalScrollIndicator={false}
            />
        </>
    )
}

export default RadioBoxes

const styles = StyleSheet.create({
    colorBoxes: {
        gap: SIZES.font,
        justifyContent: "space-between",
        marginBottom: SIZES.font,
    },
    boxWrapper: {
        width: SIZES.large + 8,
        height: SIZES.large + 8,
        borderRadius: 99,
        justifyContent: "center",
        alignItems: "center",
    },
    outerCircle: {
        width: SIZES.large + 8,
        height: SIZES.large + 8,
        borderWidth: 2,
        borderRadius: 99,
        justifyContent: "center",
        alignItems: "center",
    },      
    box: {
        width: SIZES.large,
        height: SIZES.large,
        borderRadius: 99,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 5,
    }
});
