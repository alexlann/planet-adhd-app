import { View, StyleSheet } from 'react-native';
import { useTranslation } from "react-i18next";
import Heading2 from "../typography/Heading2";
import SecondaryButton from "../buttons/SecondaryButton";
import { ButtonType } from '../../types';
import { buttonStyle } from '../../constants/styles';
import GoalList from './GoalList';

const GoalsDashboard = () => {
    const { t } = useTranslation();
    const queryLimit = 1;

    return (
        <>
            {/* HEADING */}
            <Heading2>{ t("goals-title") }</Heading2>

            {/* GOALLIST */}
            <View style={styles.goalList}>
                <GoalList scroll={false} queryCompleted={false} limit={queryLimit} />
            </View>

            {/* GO TO GOALS */}
            <View style={buttonStyle.goToButton}>
                <SecondaryButton
                    title={t("btn-link-goals")}
                    arrow="right"
                    type= {ButtonType.primary}
                    linkButtonProps={{
                        screen: "/goals",
                    }} />
            </View>
        </>
    );
}

export default GoalsDashboard;

const styles = StyleSheet.create({
    goalList: {
        marginLeft: -21,
    }
});