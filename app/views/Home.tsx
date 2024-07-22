import { runAxiosAsync } from "@app/api/runAxiosAsync";
import { AppStackParamList } from "@app/navigator/AppNavigator";
import socket, { handleSocketConnection } from "@app/socket";
import ChatNotification from "@app/ui/ChatNotification";
import CategoryList from "@components/CategoryList";
import LatestProductList, { LatestProduct } from "@components/LatestProductList";
import SearchBar from "@components/SearchBar";
import useAuth from "@hooks/useAuth";
import useClient from "@hooks/useClient";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import size from "@utils/size";
import { FC, useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useDispatch } from "react-redux";



const testData = [
    {
      id: "65943153939eb031a99e71e0",
      name: "E-book Reader",
      thumbnail:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2899&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Electronics",
      price: 129.99,
    },
    {
      id: "65943153939eb031a99e71df",
      name: "Portable Speaker",
      thumbnail:
        "https://images.unsplash.com/photo-1524656855800-59465ebcec69?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Electronics",
      price: 49.99,
    },
    {
      id: "65943153939eb031a99e71de",
      name: "Wireless Mouse",
      thumbnail:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Electronics",
      price: 29.99,
    },
    {
      id: "65943153939eb031a99e71dd",
      name: "Digital Camera",
      thumbnail:
        "https://images.unsplash.com/photo-1556306535-38febf6782e7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Electronics",
      price: 349.99,
    },
    {
      id: "65943153939eb031a99e71e2",
      name: "Laptop",
      thumbnail:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Electronics",
      price: 999.99,
    },
  ];

interface Props {}


const Home: FC<Props> = (props) => {
  const [products, setProducts] = useState<LatestProduct[]>([])
    const {navigate} = useNavigation<NavigationProp<AppStackParamList>>()
    const {authClient} = useClient()
    const {authState} = useAuth()
    const dispatch = useDispatch();

    const fetchLatestProduct = async () => {
    const res =  await runAxiosAsync<{products: LatestProduct[]}>(authClient.get('/product/latest'))
    if(res?.products) {
      setProducts(res.products)
    }
    }

    useEffect(() => {
      fetchLatestProduct()
    }, [])

    // useEffect(() => {
    //   socket.auth = {token: authState.profile?.accessToken}
    //   socket.connect()

    //   socket.on('connect', () => {
    //     console.log("connected",socket.connected);
        
    //   })

    //   socket.on("disconnect", () => {
    //     console.log("disconnected", socket.connected);
    //   })

    //   socket.on('connect_error', (error) => {
    //     console.log("Error in socket:", error.message);
        
    //   })
    //   return () => {
    //     socket.disconnect()
    //   }
    // }, []);

    useEffect(() => {
      if(authState.profile)
      handleSocketConnection(authState.profile, dispatch)
      return() => {
        socket.disconnect();
      }
    }, []);


    return (
        <>
        <ChatNotification onPress={() => navigate('Chats') } />
        <ScrollView style={styles.container}>
            <SearchBar />
            <CategoryList onPress={(category) => navigate("ProductList", {category})}/>
                <LatestProductList data={products} 
                onPress={({id}) => navigate("SingleProduct", {id})}
                />
        </ScrollView>
        </>
    )
};

const styles = StyleSheet.create({
container:{
    padding: size.padding,
    flex: 1,
}
})

export default Home;