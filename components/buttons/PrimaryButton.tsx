import { StyleSheet, Text, TextStyle, TouchableOpacity, View } from 'react-native'
import { ButtonColors, ButtonType, LinkButtonPropsType, SizeOptions } from '../../types';
import { COLORS, SIZES } from '../../constants';
import { Link } from 'expo-router';

const PrimaryButton = ({ title, handlePress, disabled = false, linkButtonProps, size=SizeOptions.large, type=ButtonType.primary }: {title: string, handlePress?: (e?: any) => void, disabled?: boolean, linkButtonProps?: LinkButtonPropsType, size?: SizeOptions, type?: ButtonType }) => {
    // VARIABLE STYLES
    let buttonColorStyle: any = {};
    let textStyle: TextStyle = {};
    if(size === SizeOptions.large) {
        // button style
        buttonColorStyle.backgroundColor = disabled ? ButtonColors[type].middle : ButtonColors[type].primary;
        
        // text style
        textStyle.color = COLORS.white;
        textStyle.fontSize = 22;
        textStyle.lineHeight = size === SizeOptions.large ? 60 : 28;
        textStyle.textAlign = "center";

    } else {
        // button style
        buttonColorStyle.backgroundColor = ButtonColors[type].primary;

        // text style
        textStyle.color = COLORS.white;
        textStyle.fontSize = SIZES.font;
    }

    const buttonSizeStyle =
        size === SizeOptions.large 
        ? styles.buttonLarge
        : styles. buttonSmall;

        
    // HANDLE BUTTONPRESS
    const buttonPress = () => {
        if (handlePress) {
            handlePress();
        }
    };

    // RETURN
    return (
        <>
            { linkButtonProps ? (
                <View style={[buttonSizeStyle, buttonColorStyle]}>
                    <Link style={styles.linkStyle} href={linkButtonProps.screen as string} asChild>
                        <Text style={textStyle}>
                            { title }
                        </Text>
                    </Link>
                </View>
            ) : (
                <TouchableOpacity
                    style={[buttonSizeStyle, buttonColorStyle]}
                    onPress={buttonPress}
                >
                    <Text style={textStyle}>
                        {title}
                    </Text>
                </TouchableOpacity>
            )}
        </>
    )
}

export default PrimaryButton

const styles = StyleSheet.create({
    linkStyle: {
        width: "100%",
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonLarge: {
        width: "100%",
        height: 60,
        borderRadius: SIZES.medium,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonSmall: {
        borderRadius: SIZES.extraSmall,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SIZES.extraSmall,
        paddingHorizontal: SIZES.medium,
        height: 46,
    },
});
