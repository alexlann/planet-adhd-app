import { Text, StyleSheet, View } from 'react-native'
import LinkButton from './LinkButton';
import { ButtonType, LinkButtonPropsType } from '../../types';
import { COLORS, FONTS, SIZES } from '../../constants';

const SubButtonText = ({ text, linkButtonProps, buttonTitle, buttonType=ButtonType.primary }: { text: string, linkButtonProps: LinkButtonPropsType, buttonTitle: string, buttonType?: ButtonType }) => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.sub}>{text}</Text>
            <LinkButton type={buttonType} title={buttonTitle} linkButtonProps={linkButtonProps} />
        </View>
    )
}

export default SubButtonText

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: "row",
        gap: 6,
    },
    sub: {
        fontSize: SIZES.font,
        fontFamily: FONTS.regular,
        color: COLORS.lightBlack,
    },
});
