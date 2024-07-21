import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgetPassword from "@views/ForgetPassword";
import SignIn from "@views/SignIn";
import SignUp from "@views/SignUp";
import { FC } from "react";
import { StyleSheet } from "react-native";
import ProfileNavigator from "./ProfileNavigator";
import ProductDetail from "@components/ProductDetail";

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgetPassword: undefined;

}

const Stack = createNativeStackNavigator<AuthStackParamList>();

interface Props { }

const AuthNavigator: FC<Props> = (props) => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({

})

export default AuthNavigator;