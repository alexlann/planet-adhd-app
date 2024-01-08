import { StyleSheet, Pressable, View } from 'react-native'
import Icon from '../../visualElements/Icon';
import { useEffect, useState } from 'react';
import AddCategoryModal from '../../modals/AddCategoryModal';
import { IconOptions } from '../../../types';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../../constants';
import { CARDITEMSIZE, DIMENSIONS } from '../../../constants/styles';

const CardButton = ({ invalidate, activeIitemIdState, onPress } : { invalidate: (args0: boolean | number | string) => void, activeIitemIdState: { activeItemId: number, setActiveItemId: (args0: number) => void }, onPress: (args0: any) => void }) => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const handlePress = () => {
        // opens modal
        setShowModal(true);
    }

    useEffect(() => {
        onPress(activeIitemIdState.activeItemId);
    }, [activeIitemIdState.activeItemId])
    

    return (
        <>
            { showModal && (
                // MODAL
                <AddCategoryModal
                    invalidate={invalidate}
                    modal={showModal}
                    setModal={setShowModal}
                    setCategoryId={activeIitemIdState.setActiveItemId}
                />
            )}
            {/* CARD */}
            <Pressable onPress={handlePress}>
                <View style={styles.category}>
                    <View style={styles.icon}>
                        <Icon color={COLORS.lightButton} icon={IconOptions.plus} size={SIZES.large} />
                    </View>
                </View>
            </Pressable>
        </>
    )
}

export default CardButton;


const styles = StyleSheet.create({
    category: {
        width: CARDITEMSIZE,
        height: CARDITEMSIZE,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        ...SHADOWS.drop,
    },
    title: {
        color: COLORS.primary,
        fontFamily: FONTS.regular,
        fontSize: SIZES.font,
        lineHeight: 24,
        textAlign: "center",
        position: "absolute",
        bottom: 5,
    },
    icon: {
        marginBottom: 5,
    }
});