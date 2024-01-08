import { StyleSheet } from 'react-native'
import { Calendar } from 'react-native-calendars';
import Loader from '../loader/Loader';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetch } from '../../core/hooks';
import { MAXDATECALENDAR, MINDATECALENDAR } from '../../constants/functional';
import { COLORS, FONTS, SIZES } from '../../constants';
import ErrorElement from '../notices/ErrorElement';

const TaskCalendar = ({ activeDay, setActiveDay, invalidateData } : { activeDay: string, setActiveDay: (args0: string)=>void, invalidateData: boolean | number }) => {
    const path = "tasks";
    const { t } = useTranslation();
    const queryCompleted = "false";
    const [errorField, setErrorField] = useState("");
    const year = new Date(activeDay).getFullYear();
    const month = new Date(activeDay).getMonth()+1;
    const {
        data: tasks,
        error,
        isLoading,
        invalidate,
    } = useFetch(`/${path}?completed=${queryCompleted}&month=${year}-${month}`);

    // invalidate data
    useEffect(() => {
        invalidate();
    }, [invalidateData]);

    // mark dates on calendar
    const markedDates = {};
    if(tasks) {
        for (let i = 0; i < tasks.length; i++) {
            for(let dt = new Date(tasks[i].startTime); dt <= new Date(tasks[i].stopTime); dt.setDate(dt.getDate()+1)){
                // @ts-ignore
                markedDates[dt.toISOString().split('T')[0]] = {
                    marked: true,
                    dotColor: tasks[i].category ? tasks[i].category.color : COLORS.darkGray
                }
            }
        }
    }
    //@ts-ignore
    // active day markings
    markedDates[activeDay] = {selected: true, disableTouchEvent: true, selectedColor: COLORS.secondary, selectedTextColor: COLORS.white};

    // handle isLoading and errors
    if(isLoading) {
        return <Loader />
    }

    if (error) {
        !errorField && setErrorField(t("error-something-wrong"));
    }

    return (
        <>
            {/* CALENDAR */}
            <Calendar
                onDayPress={day => {
                    setActiveDay(day.dateString);
                }}
                markedDates={markedDates}
                onMonthChange={(month) => {setActiveDay(month.dateString)}}
                minDate={MINDATECALENDAR}
                maxDate={MAXDATECALENDAR}
                hideArrows={true}
                firstDay={1}
                enableSwipeMonths={true}
                style={styles.calendar}
                theme={{
                    textSectionTitleColor: COLORS.lightGray,
                    textSectionTitleDisabledColor: COLORS.darkGray,
                    selectedDayBackgroundColor: COLORS.secondary,
                    selectedDayTextColor: COLORS.lightGray,
                    todayTextColor: COLORS.secondary,
                    dayTextColor: COLORS.lightBlack,
                    textDisabledColor: COLORS.lightGray,
                    dotColor: COLORS.secondary,
                    selectedDotColor: COLORS.secondary,
                    monthTextColor: COLORS.lightBlack,
                    textDayFontFamily: FONTS.regularText,
                    textMonthFontFamily: FONTS.regular,
                    textDayHeaderFontFamily: FONTS.mediumText,
                    textDayFontSize: SIZES.font,
                    textMonthFontSize: SIZES.font,
                    textDayHeaderFontSize: 14,
                    dotStyle: {
                        width: 8,
                        height: 8,
                        borderRadius: 99,
                    },
                }}
            />

            {/* ERROR */}
            { errorField && (
                <ErrorElement title={errorField} />
            ) }
        </>
    );
}

export default TaskCalendar

const styles = StyleSheet.create({
    calendar: {
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        borderRadius: 20,
        minHeight: 330,
    },
});
