import { useTranslation } from "react-i18next";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from "../visualElements/Icon";
import Reward from "../rewards/Reward";
import PrimaryButton from "../buttons/PrimaryButton";
import { FetchItemOptions, FetchItemType, IconOptions, UserLevelType } from "../../types";
import { DIMENSIONS, containerStyle, modalStyle } from "../../constants/styles";
import { COLORS, FONTS, SIZES } from "../../constants";
import Level from "../level/Level";
import { headerOptions } from "../../constants/styles";

const CompletionModal = ({ modalState, userLevelState, userLevel, invalidate } : { modalState: { modal: FetchItemType | null, setModal: (args0: any) => void }, userLevelState: {userLevelHasUpdated: boolean, setUserLevelHasUpdated: (args0: boolean)=>void}, userLevel: UserLevelType, invalidate: (args0: boolean | number | string)=>void }) => {
    const { t } = useTranslation();

    const closeModal = () =>{
        // if type is not level and level has not updated, invalidate 
        if (modalState.modal?.type !== FetchItemOptions.level && !userLevelState.userLevelHasUpdated) {
            // pass id of invalidated item
            invalidate(`complete-${modalState.modal?.id}-${Math.random()}`);

            // remove modal
            modalState.setModal(null);
        // else if type is level, invalidate goals
        } else if (modalState.modal?.type === FetchItemOptions.level) {
            invalidate(`level-${userLevel?.level.levelNumber}-${Math.random()}`);
            
            // set userLevelUpdated back to false
            userLevelState.setUserLevelHasUpdated(false);

            modalState.setModal(null);
        } else if (userLevelState.userLevelHasUpdated) {
            // if userLevel has updated, change to levelUp modal
            modalState.setModal({
                type: FetchItemOptions.level,
                title: `${t("completion-level")} ${userLevel?.level.levelNumber as number - 1}`,
                reward: userLevel?.reward as string,
            });
        }
    }

    return (
        <>
            { modalState.modal && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={!!modalState.modal}
                    statusBarTranslucent={true}
                    onRequestClose={() => {
                        closeModal();
                    }}
                >
                    <View style={modalStyle.dimBackground}>
                        <View style={modalStyle.positionWrappper}>
                            <View style={styles.cardWrapper}>
                                <View style={[containerStyle.container, styles.containerWidth]}>

                                    {/* LEVEL */}
                                    <View style={styles.levelWrapper}>
                                        <Level updatedUserLevel={userLevel} levelUp={modalState.modal.type === FetchItemOptions.level} />
                                    </View>

                                    {/* CLOSE BUTTON */}
                                    <TouchableOpacity style={styles.closeButton} onPress={closeModal} disabled={false}>
                                        <Icon size={SIZES.large} icon={IconOptions.close} color={COLORS.darkGray} />
                                    </TouchableOpacity>

                                    {/* TITLE */}
                                    <Text style={[headerOptions.headerTitleStyle, styles.header]}>{ t(`completion-title-${modalState.modal.type}`) }</Text>
                                    
                                    {/* SUBTITLE */}
                                    { modalState.modal.type !== FetchItemOptions.level && (
                                        <Text style={styles.subtitle}>{ modalState.modal.title }</Text>
                                    )}

                                    {/* REWARD */}
                                    { modalState.modal.reward ? (
                                        <View style={styles.rewardWrapper}>
                                            <Text style={styles.rewardTitle}>{ t("completion-subtitle") }</Text>
                                            <Reward title={ modalState.modal.reward } />
                                        </View>
                                    ) : (
                                        <Text style={styles.subtitle}>{ t("completion-subtitle-no-reward") }</Text>
                                    )}

                                    {/* TEXT */}
                                    <Text style={styles.reflectText}>{ t(`completion-reflect-${modalState.modal.type}`) }</Text>

                                    {/* CLOSE MODAL */}
                                    <PrimaryButton handlePress={closeModal} title={ t("btn-reflect") } />
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal >
            )}
        </>
    );
}

export default CompletionModal;

const styles = StyleSheet.create({
    cardWrapper: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: SIZES.medium,
        borderTopRightRadius: SIZES.medium,
        width: DIMENSIONS.width,
        minHeight: DIMENSIONS.height/2,
        position: "relative",
        paddingBottom: SIZES.extraLarge,
    },
    levelWrapper: {
        backgroundColor: COLORS.white,
        borderRadius: 999,
        padding: SIZES.large,
        width: 180,
        height: 180,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: -40,
        left: "50%",
        marginLeft: -90,
    },
    header: {
        marginTop: 130,
        fontSize: 32,
        textAlign: "center",
        fontFamily: FONTS.medium,
    },
    subtitle: {
        fontSize: SIZES.font,
        color: COLORS.darkGray,
        textAlign: "center",
        marginBottom: SIZES.large,
        fontFamily: FONTS.regular,
    },
    rewardTitle: {
        fontSize: SIZES.font,
        textAlign: "center",
        color: COLORS.secondaryDark,
        marginBottom: SIZES.extraSmall,
        fontFamily: FONTS.mediumText,
    },
    rewardWrapper: {
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: SIZES.extraLarge,
    },
    reflectText: {
        fontSize: SIZES.font,
        color: COLORS.lightBlack,
        lineHeight: SIZES.extraLarge,
        marginBottom: SIZES.large,
        fontFamily: FONTS.regular,
    },
    containerWidth: {
        width: "85%",
        paddingTop: 10,
    },
    closeButton: {
        marginLeft: "auto",
    },
});