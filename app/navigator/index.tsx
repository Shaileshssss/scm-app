import { FC, useEffect } from "react";
import { Platform, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import colors from '@utils/colors';
import AuthNavigator from "./AuthNavigator";
import { useDispatch } from "react-redux";
import {  Profile, updateAuthState } from "@store/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "@app/api/client";
import { runAxiosAsync } from "@app/api/runAxiosAsync";
import LoadingSpinner from "@app/ui/LoadingSpinner";
import useAuth from "@hooks/useAuth";
import TabNavigator from "./TabNavigator";
import useClient from "@hooks/useClient";
import asyncStorage, { Keys } from "@utils/asyncStorage";



const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
  },
};

export type ProfileRes = {
  profile: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    verified: boolean;

  }
}

interface Props { }

const Navigator: FC<Props> = (props) => {
  const dispatch = useDispatch()

  const {loggedIn, authState} = useAuth()
  const {authClient} = useClient()

const fetchAuthState = async () => {
  // return asyncStorage.clear();
 const token = await asyncStorage.get(Keys.AUTH_TOKEN)
 if (token) {
  dispatch(updateAuthState({ pending: true, profile: null }))
 const res = await runAxiosAsync<ProfileRes>(
  authClient.get('/auth/profile', {
    headers: {
      Authorization : "Bearer " + token,
    }
  }));

if(res) {
  dispatch(updateAuthState({pending: false, profile: {...res.profile, accessToken: token},
  }))
} else {
  dispatch(updateAuthState({ pending: false, profile: null}))
}

}
}

  useEffect(() => {
    fetchAuthState();
  },[])

  return (
    <NavigationContainer theme={MyTheme}>
      <LoadingSpinner visible={authState.pending}/>
      {!loggedIn ? <AuthNavigator /> :
        <TabNavigator />}
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({

})

export default Navigator;