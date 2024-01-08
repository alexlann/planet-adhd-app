import { Pressable, StyleSheet, Text, View } from 'react-native'
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { toLongDate } from '../../../core/maths/dateTime';
import { FONTS, SIZES } from '../../../constants';

const DateTimePickerInput = ({ value, onPress }: { value: string, onPress: (args0: any)=>void }) => {
    const onChange = (e: DateTimePickerEvent, selectedDate?: Date) => {
        if (e.type === "set") {
            onPress(selectedDate);
        }
    };

    const showMode = (currentMode?: "date" | "time") => {
        DateTimePickerAndroid.open({
        value: new Date(value),
        onChange,
        mode: currentMode,
        is24Hour: true,
        });
    };

    const showDatePicker = () => {
        showMode("date");
    };

    const showTimePicker = () => {
        showMode("time");
    };

    return (
        <View>
            <View style={styles.dateTimeWrapper}>

                {/* DATE */}
                <View style={styles.textButtonWrapper}>
                    <Pressable onPress={showDatePicker}>
                        <Text style={styles.time}>{toLongDate(value)}</Text>
                    </Pressable>
                </View>

                {/* TIME */}
                <View style={styles.textButtonWrapper}>
                    <Pressable onPress={showTimePicker}>
                        <Text style={styles.time}>{new Date(value).toLocaleTimeString("en-US", {hour: "2-digit", minute: "2-digit"})}</Text>
                    </Pressable>
                </View>
                
                {/* empty view for flexbox */}
                <View></View>
            </View>
        </View>

    );
}

export default DateTimePickerInput;

const styles = StyleSheet.create({
    dateTimeWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: SIZES.extraLarge,
    },
    textButtonWrapper: {
        flexDirection: "row",
        width: "40%",
    },
    time: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.font,
        textTransform: "capitalize",
    }
});
