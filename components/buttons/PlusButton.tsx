import { StyleSheet, Pressable } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from '../visualElements/Icon';
import { IconOptions } from '../../types';
import { COLORS, SIZES, SHADOWS } from '../../constants';
import { router } from 'expo-router';

const PlusButton = ({ linkButtonProps }: { linkButtonProps: {screen: string, props?: object} }) => {

    const buttonPress = () => {
        router.push({pathname: linkButtonProps.screen, params: linkButtonProps.props})
    }

    return (
        <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={buttonPress}
            >
            <Pressable style={styles.button}>
                {({ pressed }) => (
                    <Icon icon={IconOptions.plus} size={30} color={COLORS.white} style={[styles.button, { opacity: pressed ? 0.5 : 1 }]} />
                )}
            </Pressable>
        </TouchableOpacity>
    )
}

export default PlusButton

const styles = StyleSheet.create({
    buttonWrapper: {
        width: 60,
        height: 60,
        borderRadius: SIZES.extraLarge,
        backgroundColor: COLORS.secondary,
        ...SHADOWS.drop,
    },
    button: {
        borderRadius: SIZES.extraLarge,
        width: 60,
        height: 60,
        textAlign: "center",
        lineHeight: 60,
    },
    
});
