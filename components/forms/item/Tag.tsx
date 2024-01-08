import { Text, StyleSheet, Pressable } from 'react-native'
import { ButtonColors, ButtonType, IconOptions } from '../../../types';
import { COLORS, SIZES } from '../../../constants';
import Icon from '../../visualElements/Icon';

const Tag = ({ title, value, handlePress, buttonType=ButtonType.primary, checked }: {title: string, value: string, handlePress: (args0: string) => void, buttonType?: ButtonType, checked?: string }) => {
    return (
        <>
            <Pressable
                style={[styles.tagWrapper, {
                    backgroundColor: checked === value ? COLORS.white : ButtonColors[buttonType].primary,
                    borderColor: checked === value ? ButtonColors[buttonType].primary : "transparent",
                }]}
                onPress={() => handlePress(value)}
            >   
                {({ pressed }) => (
                    <>
                        <Icon icon={IconOptions.flagSolid} color={pressed || checked === value ? ButtonColors[buttonType].primary : ButtonColors[buttonType].light} />
                        <Text style={[styles.title, {
                            color: pressed || checked === value ? ButtonColors[buttonType].primary : ButtonColors[buttonType].light,
                        }]}>
                            { title }
                        </Text>
                    </>
                )}
            </Pressable>
        </>
    )
}



export default Tag;


const styles = StyleSheet.create({
    tagWrapper: {
        height: 36,
        paddingHorizontal: 16,
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 14,
        borderWidth: 2,
        flexDirection: "row",
        gap: SIZES.small,
    },
    title: {
        fontSize: SIZES.font,
        textTransform: 'capitalize',
    },
});