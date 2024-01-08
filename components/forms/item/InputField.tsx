import { StyleSheet, TextInput, View, TextStyle } from 'react-native'
import React from 'react';
import Label from '../../typography/Label';
import { COLORS, FONTS, SIZES } from '../../../constants';

const InputField = ({ isSecret=false, label, placeholder, style, onChange, value, multiline=false, labelIndent=true, ...props }: { isSecret?: boolean, label?: string, placeholder?: string, style?: TextStyle, onChange: (e?: any) => void, value: string, multiline?: boolean, labelIndent?: boolean }) => {
    return (
        <View style={style}>
            {/* LABEL */}
            <Label indent={labelIndent}>{label}</Label>

            {/* INPUT */}
            <TextInput
                style={[styles.input, multiline && styles.multilineInput]}
                onChangeText={onChange}
                value={value}
                placeholder={placeholder}
                secureTextEntry={isSecret}
                multiline={multiline}
                {...props}
            />
        </View>
    )
}

export default InputField;

const styles = StyleSheet.create({
    input: {
        fontFamily: FONTS.regular,
        width: "100%",
        height: 52,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.extraLarge,
        fontSize: SIZES.small,
        paddingHorizontal: 22,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
    },
    multilineInput: {
        height: 100,
        borderRadius: SIZES.medium,
        paddingVertical: SIZES.small,
        verticalAlign: "top",
    },
});
