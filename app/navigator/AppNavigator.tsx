import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgetPassword from "@views/ForgetPassword";
import Home from "@views/Home";
import SignIn from "@views/SignIn";
import SignUp from "@views/SignUp";
import { FC } from "react";
import { StyleSheet } from "react-native";

export type AppStackParamList = {
    Home: undefined;
}

const Stack = createNativeStackNavigator<AppStackParamList>();

interface Props {}

const AppNavigator: FC<Props> = (props) => {
    return     <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
}

const styles = StyleSheet.create({

})

export default AppNavigator;