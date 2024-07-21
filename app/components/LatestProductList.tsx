import colors from "@utils/colors";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import ProductGridView from "./ProductGridView";

export type LatestProduct = {
    id: string;
    name: string;
    price: number;
    thumbnail?: string;
    category: string;
}

interface Prop {
    data: LatestProduct[];
    onPress(product: LatestProduct) : void
}

const LatestProductList: FC<Prop> = ({data, onPress}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recently Listed Offer</Text>
            <ProductGridView data={data}  onPress={onPress}/>
        </View>
    )
}

const styles = StyleSheet.create({
container: {},
title: {
    fontWeight: '600',
    color: colors.primary,
    fontSize: 20,
    marginBottom: 15,
    letterSpacing: 0.5,

},
})

export default LatestProductList;