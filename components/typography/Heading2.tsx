import { Text, StyleSheet, ViewStyle } from 'react-native'
import { COLORS, FONTS } from '../../constants';

const Heading2 = ({ style, children }: {style?:ViewStyle, children: any}) => {
    return (
        <Text style={[styles.heading, style]}>{children}</Text>
    )
}

export default Heading2

const styles = StyleSheet.create({
    heading: {
        fontSize: 22,
        fontFamily: FONTS.medium,
        color: COLORS.primary,
        lineHeight: 29,
        marginBottom: 14,
    }
});
