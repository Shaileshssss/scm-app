import { FC } from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { LatestProduct } from "./LatestProductList";
import GridView from "@app/ui/GridView";
import { formatPrice } from "@utils/helpers";
import colors from "@utils/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';


interface Props {
    data: LatestProduct[];
    onPress(item: LatestProduct): void
}


const ProductGridView: FC<Props> = ({ data, onPress }) => {
    return (
        <GridView
        data={data}
        renderItem={(item) => {
            return (
                <Pressable
                onPress={() => onPress(item)}
                 style={styles.productContainer}>
                  { item.thumbnail ? <Image
                    source={{uri: item.thumbnail}}
                    style={styles.thumbnail}
                     /> : (
                        <View style={[styles.thumbnail, styles.noImageView]}>
                            <MaterialCommunityIcons name="image-off" size={35} color={colors.primary} />
                        </View>
                     )}
                     <Text style={styles.price}>{formatPrice(item.price)}</Text>
                     <Text style={styles.name}>{item.name}</Text>
                </Pressable>
            )
        }}
        />

    )
}

const styles = StyleSheet.create({
    thumbnail: {
        width: '100%',
        height: 100,
        borderRadius: 5
    },
    noImageView: {
        backgroundColor: colors.deActive,
        alignItems: 'center',
        justifyContent: 'center',
    },
    price :{
        fontSize: 16,
        fontWeight: '600',
        color: colors.active,
        paddingTop: 5,
    },
    name: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.primary,
    },
    productContainer: {
        padding:7,
    }
})

export default ProductGridView;