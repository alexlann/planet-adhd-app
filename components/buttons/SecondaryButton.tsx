import { StyleSheet, Text, View, Pressable } from 'react-native'
import { ButtonColors, ButtonType, IconOptions, LinkButtonPropsType } from "../../types/index";
import Icon from '../visualElements/Icon';
import { FONTS, SIZES } from '../../constants';
import { Link } from 'expo-router';

const SecondaryButton = ({title, handlePress, disabled = false, arrow = null, type=ButtonType.primary, linkButtonProps }: {title?: string, handlePress?: (e?: any) => void, disabled?: boolean, arrow?: "right" | "left" | "up" | "down" | null, type?: ButtonType, linkButtonProps?: LinkButtonPropsType }) => {
    const textStyle: any = {color: disabled ? ButtonColors[type].middle : ButtonColors[type].dark};

    const buttonPress = () => {
        if (handlePress) {
            handlePress();
        }
    }

    return (
        <>
            { linkButtonProps ? (
                <View style={styles.wrapper}>
                    <Link style={[styles.text, textStyle]} href={linkButtonProps.screen as string} asChild>
                        { title && 
                            <Text>
                                {title}
                            </Text>
                        }
                    </Link>
                    { arrow && (
                        <Icon icon={IconOptions[arrow]} color={textStyle.color as string} />
                    )}
                </View>
            ) : (
                <Pressable onPress={buttonPress} disabled={disabled}>
                    <View style={styles.wrapper}>
                        { title && 
                            <Text style={[styles.text, textStyle]}>
                                {title}
                            </Text>
                        }
                        { arrow && (
                            <Icon icon={IconOptions[arrow]} color={textStyle.color as string} />
                        )}
                    </View>
                </Pressable>
            )}
        </>
    )
}

export default SecondaryButton

const styles = StyleSheet.create({
    wrapper: {
        gap: 10,
        flexDirection: "row",
        alignItems: "baseline"
    },
    text: {
        fontSize: SIZES.small,
        fontWeight: "bold",
        lineHeight: 18,
        gap: 10,
        fontFamily: FONTS.regularText,
    },
});
