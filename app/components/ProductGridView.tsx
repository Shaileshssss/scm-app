import { FC } from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { LatestProduct } from "./LatestProductList";
import GridView from "@app/ui/GridView";
import { formatPrice } from "@utils/helpers";
import colors from "@utils/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProductCard from "@app/ui/ProductCard";


interface Props {
    data: LatestProduct[];
    onPress(item: LatestProduct): void
}


const ProductGridView: FC<Props> = ({ data, onPress }) => {
    return (
        <GridView
            data={data}
            renderItem={(item) => <ProductCard product={item} onPress={onPress} />
            }
        />
    )
}


export default ProductGridView;