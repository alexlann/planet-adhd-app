import { View, StyleSheet } from 'react-native';
import { ButtonType, LinkButtonPropsType } from '../../types';
import PrimaryButton from './PrimaryButton';
import SubButtonText from './SubButtonText';
import { COLORS, SIZES } from '../../constants';

const ButtonWithSubText = ({ title, subText, handlePress, linkButtonProps, buttonTitle, buttonType }: { title: string, subText: string, handlePress: (e?: any) => void , linkButtonProps: LinkButtonPropsType, buttonTitle: string, buttonType: ButtonType }) => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <PrimaryButton  title={ title } handlePress={handlePress} />
                <SubButtonText buttonTitle={buttonTitle} buttonType={buttonType} text={ subText } linkButtonProps={linkButtonProps} />
            </View>
        </View>
    )
}

export default ButtonWithSubText

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: SIZES.medium,
        borderTopRightRadius: SIZES.medium,
        height: 170,
    },
    container: {
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        flex: 1,
        marginTop: 32,
        rowGap: 16,
    },
});