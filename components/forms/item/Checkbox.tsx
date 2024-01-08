import { StyleSheet, View, Text, ViewStyle, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { ButtonType, IconOptions } from "../../../types/index";
import Icon from '../../visualElements/Icon';
import { COLORS, FONTS, SIZES } from '../../../constants';

const Checkbox = ({ disabled=false, handlePress, style, fillStyle, children }: { disabled?: boolean, handlePress?: () => void, style?: ViewStyle, fillStyle: ButtonType | false, children: string|JSX.Element }) => {
    const [filledColor, setFilledColor] = useState(COLORS.primaryLight);
    const [filledIcon, setFilledIcon] = useState(IconOptions.check);
    const [filledIconColor, setFilledIconColor] = useState(COLORS.primaryDark);

    // give correct colors to completed items
    useEffect(() => {
        if (fillStyle === ButtonType.danger) {
            setFilledColor(COLORS.red);
            setFilledIcon(IconOptions.close);
            setFilledIconColor(COLORS.white);
        } else {
            setFilledColor(COLORS.primaryLight);
            setFilledIcon(IconOptions.check);
            setFilledIconColor(COLORS.primaryDark);
        }
    }, [fillStyle])
    
    
    const onPress = () => {
        handlePress && handlePress()
    }
    
    return (
        <View style={[styles.checkBoxWrapper, style, {
                height: children === "string" ? 52 : "100%",
                marginBottom: children === "string" ? 20 : 0,
            }]}>
            <TouchableOpacity
                activeOpacity={0.7}
                style={[
                    styles.checkBoxContainer,
                    {
                        borderColor: fillStyle ? filledColor : COLORS.primaryMiddle,
                        backgroundColor: fillStyle ? filledColor : COLORS.white,
                    },
                ]}
                onPress={onPress}
                disabled={disabled}
            >
                {fillStyle
                    ? <View style={styles.checkboxIcon}>
                        <Icon icon={filledIcon} color={filledIconColor} size={SIZES.small} />
                      </View>
                    : <></>
                }
            </TouchableOpacity>
            { typeof children === "string"
              ? <Text style={styles.content}>{children}</Text>
              : <View style={styles.componentContent}>{ children }</View>
            }
            
        </View>
    )
}

export default Checkbox

const styles = StyleSheet.create({
    checkBoxWrapper: {
        width: "100%",
        backgroundColor: COLORS.white,
        borderRadius: SIZES.extraLarge,
        fontFamily: FONTS.regular,
        fontSize: SIZES.small,
        paddingHorizontal: 22,
        gap: 14,
        flexDirection: "row",
        alignItems: "center",
    },
    checkBoxContainer: {
        width: 22,
        height: 22,
        borderRadius: 999,
        borderWidth: 2,
        marginVertical: "auto",
    },
    checkboxIcon: {
        justifyContent: "center",
        alignItems: "center",
        height: 15
    },
    content: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.font,
        color: COLORS.lightBlack,
    },
    componentContent: {
        marginTop: -SIZES.font,
    },
});
