import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Product } from "@store/listings";
import Chats from "@views/Chats";
import ChatWindow from "@views/ChatWindow";
import ForgetPassword from "@views/ForgetPassword";
import Home from "@views/Home";
import Listings from "@views/Listings";
import Profile from "@views/Profile";
import SignIn from "@views/SignIn";
import SignUp from "@views/SignUp";
import SingleProduct from "@views/SingleProduct";
import { FC } from "react";
import { StyleSheet } from "react-native";

export type ProfileNavigatorParamList = {
  Profile: undefined;
  Chats: undefined;
  Listings: undefined;
  SingleProduct: {product?:  Product};
  ChatWindow: undefined;
}

const Stack = createNativeStackNavigator<ProfileNavigatorParamList>();

interface Props {}

const ProfileNavigator: FC<Props> = (props) => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="Chats" component={Chats} />
    <Stack.Screen name="Listings" component={Listings} />
    <Stack.Screen name="SingleProduct" component={SingleProduct} />
    <Stack.Screen name="ChatWindow" component={ChatWindow} />

  </Stack.Navigator>
    )
}

const styles = StyleSheet.create({

})

export default ProfileNavigator;