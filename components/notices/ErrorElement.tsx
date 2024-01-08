import { StyleSheet, Text } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';

const ErrorElement = ({title} : {title: string}) => {
    return (
        <Text style={styles.error}>
            { title }
        </Text>
    )
}

export default ErrorElement;

const styles = StyleSheet.create({
    error: {
        color: COLORS.red,
        fontFamily: FONTS.regular,
        fontSize: SIZES.small,
        marginTop: SIZES.font,
        marginBottom: SIZES.extraSmall,
        marginLeft: "auto",
    },
});