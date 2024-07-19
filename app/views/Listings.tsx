import { runAxiosAsync } from "@app/api/runAxiosAsync";
import BackButton from "@app/ui/BackButton";
import ProductImage from "@app/ui/ProductImage";
import AppHeader from "@components/AppHeader";
import useClient from "@hooks/useClient";
import size from "@utils/size";
import { FC, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ProfileNavigatorParamList } from "@app/navigator/ProfileNavigator";
import { getListings, Product, updateListings } from "@store/listings";
import { useDispatch, useSelector } from "react-redux";


interface Props { }

type ListingResponse = {
    products: Product[];
}

const Listings: FC<Props> = (props) => {
    const { navigate } = useNavigation<NavigationProp<ProfileNavigatorParamList>>()
    // const [listings, setListings] = useState<Product[]>([])
    const [fetching, setFetching] = useState(false)
    const { authClient } = useClient()
    const dispatch = useDispatch()
    const listings = useSelector(getListings)

    const fetchListings = async () => {
        setFetching(true)
        const res = await runAxiosAsync<ListingResponse>(authClient.get('/product/listings'))
        setFetching(false)
        if (res) {
            dispatch(updateListings(res.products));
        }
    };

    useEffect(() => {
        fetchListings()
    }, [])

    return (
        <View style={styles.container}>
            <AppHeader backButton={<BackButton />} />
            <FlatList
                refreshing={fetching}
                onRefresh={fetchListings}
                data={listings}
                contentContainerStyle={styles.flatList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <Pressable
                            onPress={() => navigate('SingleProduct', { product: item })}
                            style={styles.listItem}
                        >
                            <ProductImage uri={item.thumbnail} />
                            <Text style={styles.productName}
                                numberOfLines={2}
                            >
                                {item.name}</Text>
                        </Pressable>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: size.padding,
    },
    listItem: {
        paddingBottom: size.padding,
    },
    productName: {
        fontWeight: "700",
        fontSize: 20,
        letterSpacing: 1,
        paddingTop: 10,
    },
    flatList: {
        paddingBottom: 20,
    }
})

export default Listings