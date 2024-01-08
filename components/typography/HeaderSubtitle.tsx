import { Text, StyleSheet } from 'react-native'
import { FONTS, SIZES } from '../../constants';

const HeaderSubtitle = ({ subtitle }: {subtitle: string}) => {
    return (
        <Text style={styles.sub}>{subtitle}</Text>
    )
}

export default HeaderSubtitle

const styles = StyleSheet.create({
    sub: {
        fontSize: SIZES.font,
        lineHeight: SIZES.large,
        fontFamily: FONTS.regular,
    }
});
