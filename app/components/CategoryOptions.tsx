import OptionSelector from "@views/OptionSelector";
import { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import OptionModal from "./OptionModal";
import categories from "@utils/categories";
import CategoryOption from "@app/ui/CategoryOption";



interface Props {
    title: string;
    onSelect(category: string): void
}

const CategoryOptions: FC<Props> = ({ title, onSelect }) => {
    const [showCategoryModal, setShowCategoryModal] = useState(false);

    return (
        <View>
            <OptionSelector
                title={title}
                onPress={() => setShowCategoryModal(true)}
            />

            <OptionModal
                visible={showCategoryModal}
                onRequestClose={setShowCategoryModal}
                options={categories}
                renderItem={(item) => {
                    return <CategoryOption {...item} />
                }}
                onPress={(item) => onSelect(item.name)
                }

            />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default CategoryOptions;