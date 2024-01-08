import { FlatList, StyleSheet, View, ViewStyle } from 'react-native'
import Loader from '../loader/Loader';
import TaskItem from './item/TaskItem';
import { FetchItemOptions, SizeOptions } from '../../types';
import NothingHere from '../notices/NothingHere';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetch } from '../../core/hooks';
import ErrorElement from '../notices/ErrorElement';
import { SIZES } from '../../constants';
import { DIMENSIONS } from '../../constants/styles';

const TaskList = ({ style, sizeNothingHere=SizeOptions.small, limitedDay, queryCompleted=false, dashboardText=false, invalidateData } : { style?: ViewStyle, sizeNothingHere?: SizeOptions, limitedDay?: string, queryCompleted?: boolean, dashboardText?: boolean, invalidateData: {setInvalidate: (args0: boolean | number | string)=>void, invalidate: boolean | number} } ) => {
    const path = "tasks";
    const { t } = useTranslation();
    const [errorField, setErrorField] = useState("");
    const {
        data: tasks,
        error,
        isLoading,
        invalidate,
    } = useFetch(`/${path}?completed=${queryCompleted}&day=${limitedDay}`);

    // invalidate data
    useEffect(() => {
        if(invalidateData.invalidate) {
            invalidate();
        }
    }, [invalidateData.invalidate]);
    
    // handle isLoading and errors
    if(isLoading) {
        return <Loader />
    }

    if (error) {
        !errorField && setErrorField(t("error-something-wrong"));
    }

    return (
        <>
            {/* TASK LIST */}
            <View style={style}>{ tasks && tasks.length > 0 && !isLoading
                ? <FlatList
                    contentContainerStyle={styles.taskItems}
                    data={tasks}
                    renderItem={(item) => (
                        <>
                            {/* TASK ITEM */}
                            <TaskItem invalidate={invalidateData.setInvalidate} task={item.item} />
                        </>
                    )}
                    keyExtractor={(item) => `${item?.id}`}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled
                    scrollEnabled={false}
                />
                : <NothingHere
                    size={sizeNothingHere}
                    itemType={dashboardText ? "dashboardTask" : FetchItemOptions.task}
                />
            }</View>

            {/* ERROR */}
            { errorField && (
                <ErrorElement title={errorField} />
            ) }
        </>
    )
}

export default TaskList;

const styles = StyleSheet.create({
    taskItems: {
        borderRadius: SIZES.medium,
        paddingVertical: SIZES.font,
        width: DIMENSIONS.width*0.9,
        minHeight: DIMENSIONS.height*0.3
    },
});