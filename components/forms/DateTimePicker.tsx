import { StyleSheet, Text, View } from 'react-native'
import { useTranslation } from 'react-i18next';
import Icon from '../visualElements/Icon';
import { IconOptions } from '../../types';
import { COLORS, FONTS, SIZES } from '../../constants';
import DateTimePickerInput from './item/DateTimePickerInput';

const DateTimePicker = ({ handleChange, startTime, stopTime }: { handleChange: (args0: any, args1: any)=>void, startTime: string, stopTime: string }) => {
    const { t } = useTranslation();

    return (
        <View style={styles.wrapper}>
            <Icon icon={IconOptions.calendar} color={COLORS.primary} size={SIZES.extraLarge} />
            <View style={styles.dateTimePickersWrapper}>

                {/* STARTTIME */}
                <View>
                    <Text style={styles.title}>{ t("tasks-from")}</Text>
                    <DateTimePickerInput onPress={(value) => handleChange(value, "startTime")} value={ startTime } />
                </View>

                {/* STOPTIME */}
                <View>
                    <Text style={styles.title}>{ t("tasks-to")}</Text>
                    <DateTimePickerInput onPress={(value) => handleChange(value, "stopTime")} value={ stopTime } />
                </View>
            </View>
        </View>

    );
}

export default DateTimePicker;

const styles = StyleSheet.create({
    wrapper: {
        gap: SIZES.extraLarge,
        flexDirection: "row",
    },
    dateTimePickersWrapper: {
        gap: SIZES.large,
    },
    title: {
        color: COLORS.lightBlack,
        fontFamily: FONTS.bold,
        fontSize: SIZES.small,
        marginBottom: 4,
    },
});
