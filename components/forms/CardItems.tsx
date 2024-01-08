import { FlatList, StyleSheet } from 'react-native'
import { CategoryType } from '../../types';
import Loader from '../loader/Loader';
import { useEffect, useState } from 'react';
import CardItem from './item/CardItem';
import { useTranslation } from 'react-i18next';
import Heading2 from '../typography/Heading2';
import { COLORS } from '../../constants';
import { useFetch } from '../../core/hooks';
import CardButton from './item/CardButton';
import ErrorElement from '../notices/ErrorElement';
import { CARDITEMGAP } from '../../constants/styles';

const CardItems = ({ onPress, path, value, label } : { onPress: (args0: number) => void, path: "goals" | "categories", value: number, label?: string }) => {
    const [activeItemId, setActiveItemId] = useState(value);
    const [editedData, setEditedData] = useState<any>();
    const [errorField, setErrorField] = useState("");
    const [invalidateCategories, setInvalidateCategories] = useState<boolean | number | string>(false);
    const { t } = useTranslation();
    const query = path === "goals" ? "?completed=false" : "";

    // add "empty category/goal" option and "add category" options when data is fetched
    const addButtons = (data: any) => {
        // "add category" button
        const addItemButton = { 
            id: -1,
        };

        // "empty category" card
        const emptyItem = { 
            id: 0,
            title: t(`card-no-${path}`),
            color: COLORS.lightButton,
            icon: "close",
        };

        // only add "add category" button if path is "categories"
        if(path === "categories") {
            setEditedData([addItemButton, emptyItem, ...data as any]);
        } else {
            setEditedData([emptyItem, ...data]);
        }
    };

    // fetch and add buttons onSuccess
    const {
        error,
        isLoading,
        invalidate,
    } = useFetch(`/${path}${query}`, addButtons);


    // set new active item id when new value is selected
    useEffect(() => {
        setActiveItemId(value);
    }, [value]);
    
    // handle invalidate, isLoading and errors
    useEffect(() => {
        if (invalidateCategories) {
            invalidate();
        }
    }, [invalidateCategories, isLoading, activeItemId]);

    if(isLoading) {
        return <Loader />
    }

    if (error) {
        !errorField && setErrorField(t("error-something-wrong"));
    }

    return (
        <>
            {label && (
                <Heading2>{label}</Heading2>
            )}
            <FlatList
                numColumns={3}
                data={editedData}
                renderItem={(item) => (
                    item.item.id === -1
                    // cardButton for "add category"-button in list
                    ? <CardButton
                        onPress={onPress}
                        activeIitemIdState={{activeItemId, setActiveItemId}}
                        invalidate={setInvalidateCategories}
                        />
                    // cardItem for every other item in list
                    : <CardItem
                        onPress={onPress}
                        item={item.item as unknown as CategoryType}
                        invalidate={setInvalidateCategories}
                        activeIitemIdState={{activeItemId, setActiveItemId}}
                        path={path}
                    />
                )}
                keyExtractor={(item: any, index: number) => {return `${index}`}}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.columnWrapperStyle}
                scrollEnabled={false}
            />

            {/* ERROR */}
            { errorField && (
                <ErrorElement title={errorField} />
            ) }
        </>
    )
}

export default CardItems;


const styles = StyleSheet.create({
    columnWrapperStyle: {
        justifyContent: "flex-start",
        rowGap: CARDITEMGAP,
        columnGap: CARDITEMGAP / 2,
        flex: 3,
        flexWrap: "wrap",
        flexDirection: "row",
    },
});