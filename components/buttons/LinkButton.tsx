import { StyleSheet, Text, TextStyle } from 'react-native'
import { ButtonColors, ButtonType, LinkButtonPropsType } from '../../types';
import { COLORS, FONTS, SIZES } from '../../constants';
import { Link } from 'expo-router';

const LinkButton = ({ type=ButtonType.primary, linkButtonProps, title }: { type: ButtonType, linkButtonProps: LinkButtonPropsType, title: string }) => {
    const textStyle: TextStyle = {color: ButtonColors[type].primary};

    return (
        <Link href={linkButtonProps.screen as string}>
            <Text style={[styles.link, textStyle]}>
                {title}
            </Text>
        </Link>
    )
}

export default LinkButton

const styles = StyleSheet.create({
    link: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.secondary,
        textDecorationLine: 'underline',
    },
});