import { View, ViewStyle } from 'react-native';
import Loader from "../loader/Loader"
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { FetchItemOptions, SizeOptions } from '../../types';
import { useCallback, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetch } from '../../core/hooks';
import ErrorElement from '../notices/ErrorElement';
import NothingHere from '../notices/NothingHere';
import GoalItem from './item/GoalItem';

const GoalList = ({ scroll=false, style, queryCompleted=false, limit=null, size=SizeOptions.medium, invalidateData=false, sizeNothingHere=SizeOptions.small, setIsEmpty }: { scroll?: boolean, style?: ViewStyle, queryCompleted?: boolean, limit?: null|number, size?: SizeOptions, invalidateData?: boolean | number | string, sizeNothingHere?: SizeOptions, setIsEmpty?: (arg0: boolean)=>void }) => {
    const path = "goals";
    const { t } = useTranslation();
    const [refreshing, setRefreshing] = useState(false);
    const [errorField, setErrorField] = useState("");
    const [invalidateGoals, setInvalidateGoals] = useState<boolean | number | string>(false)
    const {
        data: goals,
        error,
        isLoading,
        invalidate,
    } = useFetch(`/${path}?completed=${queryCompleted}&limit=${limit}`);


    // INVALIDATE & REFRESH
    // invalidate data
    useEffect(() => {
        if(invalidateGoals || invalidateData) {
            invalidate();
        }
    }, [invalidateGoals, invalidateData]);

    // handle refresh
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        invalidate();
    }, []);

    // if no longer loading and there are no goals found, set isEmtpy to true
    useEffect(() => {
        if (!isLoading) {
            setIsEmpty && setIsEmpty(goals?.length === 0)
        }
        refreshing && !isLoading && setRefreshing(false);
    }, [goals, isLoading])


    // Handle isLoading and error
    if(isLoading) {
        return <Loader />
    }

    if (error) {
        !errorField && setErrorField(t("error-fetch-error"));
    }

    return (
        <View>
            { goals?.length > 0
                // GOALLIST
                ? <FlatList
                    data={goals}
                    renderItem={(item: any) => (
                        // GOALITEM
                        <GoalItem invalidate={setInvalidateGoals} size={size} goal={item.item} pressable={!queryCompleted} lastItem={!!(item.index === goals.length - 1)} />
                    )}
                    keyExtractor={(item: any) => `${item.id}`}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled
                    contentContainerStyle={style}
                    scrollEnabled={scroll}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />

                // EMPTY GOALS OBJECT
                : <NothingHere
                    style={limit && !queryCompleted ? {width: "90%", marginLeft: "8%"} : {}}
                    itemType={FetchItemOptions.goal}
                    size={sizeNothingHere}
                    buttonProps={{screen: "/goals/add"}}
                />
            }

            {/* ERROR */}
            { errorField && (
                <ErrorElement title={errorField} />
            ) }
        </View>
    );
}

export default GoalList;
