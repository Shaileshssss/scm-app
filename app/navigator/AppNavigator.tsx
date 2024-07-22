import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Product } from "@store/listings";
import Chats from "@views/Chats";
import ChatWindow from "@views/ChatWindow";
import ForgetPassword from "@views/ForgetPassword";
import Home from "@views/Home";
import ProductList from "@views/ProductList";
import SignIn from "@views/SignIn";
import SignUp from "@views/SignUp";
import SingleProduct from "@views/SingleProduct";
import { FC } from "react";
import { StyleSheet } from "react-native";

export type AppStackParamList = {
    Home: undefined;
    Chats : undefined;
    ProductList: {category: string};
    SingleProduct: { product?: Product, id?: string};
    ChatWindow: {
      conversationId: string;
      peerProfile: { 
        id: string;
        name: string;
        avatar?:string
      };
    };
};

const Stack = createNativeStackNavigator<AppStackParamList>();

interface Props {}

const AppNavigator: FC<Props> = (props) => {
    return     <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Chats" component={Chats} />
    <Stack.Screen name="ProductList" component={ProductList} />
    <Stack.Screen name="SingleProduct" component={SingleProduct} />
    <Stack.Screen name="ChatWindow" component={ChatWindow} />
  </Stack.Navigator>
}

const styles = StyleSheet.create({

})

export default AppNavigator;