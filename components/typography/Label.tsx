import { StyleSheet, Text } from 'react-native'
import { COLORS, FONTS, SIZES } from '../../constants';

const Label = ({ indent=true, children }: { indent?: boolean, children?: string }) => {
    return (
        <Text style={[styles.label, indent && styles.indent]}>{children}</Text>
    )
}

export default Label;

const styles = StyleSheet.create({
    label: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.small,
        color: COLORS.lightBlack,
        paddingBottom: 3,
    },
    indent: {
        marginLeft: 22,
    }
});
