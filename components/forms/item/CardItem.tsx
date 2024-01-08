import { Text, StyleSheet, Pressable, View } from 'react-native'
import Icon from '../../visualElements/Icon';
import { CategoryType, IconOptions } from '../../../types';
import { useState } from 'react';
import AddCategoryModal from '../../modals/AddCategoryModal';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../../constants';
import { CARDITEMSIZE } from '../../../constants/styles';


const CardItem = ({ item, onPress, invalidate, activeIitemIdState, path } : { item: CategoryType, onPress: (args0: number) => void, invalidate: (args0: boolean | number | string) => void, activeIitemIdState: { activeItemId: number, setActiveItemId: (args0: any)=>void }, path: "categories" | "goals" }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const color = item.color || COLORS.secondary;
    // @ts-ignore
    const cardIcon = IconOptions[item.icon || "star"];

    // FUNCTIONS
    const handlePress = () => {
        onPress(item.id);
        activeIitemIdState.setActiveItemId(item.id);
    }

    const onLongPress = () => {
        if(item.id !== 0 && path === "categories") {
            // opens modal
            setShowModal(true);
            onPress(activeIitemIdState.activeItemId);
        }
    }

    return (
        <>
            { item.id !== 0 && path === "categories" && showModal && (
                // MODAL
                <AddCategoryModal
                    invalidate={invalidate}
                    modal={showModal}
                    setModal={setShowModal}
                    category={item}
                    setCategoryId={activeIitemIdState.setActiveItemId}
                />
            )}
            {/* CARD */}
            <Pressable onPress={handlePress} onLongPress={onLongPress}>
                {({ pressed }) => (
                    <View style={styles.category}>
                        <View style={[styles.main, {backgroundColor: activeIitemIdState.activeItemId === item.id ? color : COLORS.white}]}>
                            {/* empty view for flexbox */}
                            <View></View>
                            <Icon style={styles.icon} color={pressed || activeIitemIdState.activeItemId === item.id ? COLORS.white : color} icon={cardIcon} size={SIZES.large} />
                            <Text numberOfLines={1} style={[styles.title, {color: pressed || activeIitemIdState.activeItemId === item.id ? COLORS.white : color}]}>{ item.title }</Text>
                        </View>
                    </View>
                )}
            </Pressable>
        </>
    )
}

export default CardItem;

const styles = StyleSheet.create({
    category: {
        width: CARDITEMSIZE,
        height: CARDITEMSIZE,
        borderRadius: 20,
        marginBottom: 20,
        ...SHADOWS.drop,
    },
    main: {
        marginBottom: 5,
        position: "relative",
        width: CARDITEMSIZE,
        height: CARDITEMSIZE,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
    icon: {
        marginBottom: CARDITEMSIZE / 6,
    },
    title: {
        color: COLORS.primary,
        fontSize: SIZES.font,
        lineHeight: 24,
        textAlign: "center",
        position: "absolute",
        bottom: CARDITEMSIZE / 5,
        fontFamily: FONTS.medium,
        width: "80%"
    }
});