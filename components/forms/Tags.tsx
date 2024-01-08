import { StyleSheet, FlatList, View } from 'react-native'
import { TaskImportance, TaskImportanceTypes } from '../../types';
import Heading2 from '../typography/Heading2';
import { SIZES } from '../../constants';
import Tag from './item/Tag';

const Tags = ({ tagArray, onPress, value, label, detailPage=false } : { tagArray?: [], onPress: (args0: string) => void , value: string, label?: string, detailPage?: boolean }) => {

    // Create array with tags
    const importanceArray = [];
    for (let key in TaskImportance) {
        //@ts-ignore
        importanceArray.push(TaskImportance[key.toLowerCase() as TaskImportance]);
    }
    const data = tagArray ? tagArray : importanceArray;

    // FUNCTIONS
    const handlePress = (newValue: string) => {
        onPress(newValue);
    };

    return (
        <View>
            {/* LABEL */}
            { label && (
                <Heading2>{label}</Heading2>
            )}

            {/* TAGLIST */}
            <FlatList
                data={data}
                renderItem={(item) => (
                    // TAG
                    <Tag
                        title={item.item as unknown as string}
                        value={item.item as unknown as string}
                        handlePress={handlePress}
                        checked={value}
                        //@ts-ignore
                        buttonType={TaskImportanceTypes[item.item.toLowerCase() as TaskImportance]}
                    />
                )}
                showsVerticalScrollIndicator={false}
                style={!detailPage && styles.tagsWrapper}
                contentContainerStyle={detailPage && styles.tagsWrapper}
                scrollEnabled={false}
            />
        </View>
    )
}

export default Tags;


const styles = StyleSheet.create({
    tagsWrapper: {
        flexDirection: 'row',
        marginBottom: SIZES.extraLarge,
        marginTop: SIZES.small,
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 16,
        width: "100%",
    },
});