import { Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import Icon from '../visualElements/Icon';
import { useTranslation } from 'react-i18next';
import { IconOptions } from '../../types';
import { TextInput } from 'react-native-gesture-handler';
import { COLORS, FONTS, SIZES } from '../../constants';

const Reward = ({ title, type="text", onChange, value, placeholder } : { title?: string, type?: "text" | "input", onChange?: (e?: any) => void, value?: string, placeholder?: string }) => {
    const { t } = useTranslation();

    return (
        <KeyboardAvoidingView style={[styles.reward, type === "text" ? styles.staticReward : styles.dynamicReward ]}>
            <Icon size={SIZES.medium} color={COLORS.secondary} icon={IconOptions.medal} />
            { type === "input" && onChange
                ? <TextInput style={styles.title} onChangeText={onChange} value={ value as string } placeholder={ placeholder ? placeholder : t("placeholder-reward") } />
                : <Text numberOfLines={1} style={[ styles.title, styles.staticTitle ]}>{ title }</Text>
            }
        </KeyboardAvoidingView>
    )
}

export default Reward;


const styles = StyleSheet.create({
    reward: {
        borderRadius: 999,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: 12,
        paddingVertical: 7,
        width: "100%",
    },
    dynamicReward: {
        backgroundColor: COLORS.white,
        borderColor: COLORS.secondaryDark,
        borderWidth: 1,
    },
    staticReward: {
        backgroundColor: COLORS.secondaryLight,
    },
    staticTitle: {
        color: COLORS.secondaryDark,
    },
    title: {
        width: "90%",
        color: COLORS.black,
        fontSize: SIZES.font,
        lineHeight: SIZES.font,
        fontFamily: FONTS.regular,
    }
});