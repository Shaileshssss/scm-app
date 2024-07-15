// import { NavigationContainer } from "@react-navigation/native";
import { FC } from "react";
// import { StyleSheet } from "react-native";
import { Platform, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import colors from '@utils/colors';
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";



const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
  },
};


interface Props {}

const Navigator:FC<Props> = (props) => {
  const loggedIn = true
    return ( <NavigationContainer theme={MyTheme}>
{!loggedIn ?<AuthNavigator /> : <AppNavigator />}
  </NavigationContainer>
    )
}

const styles = StyleSheet.create ({

})

export default Navigator;