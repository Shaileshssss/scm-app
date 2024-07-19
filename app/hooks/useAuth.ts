import client from "@app/api/client";
import { runAxiosAsync } from "@app/api/runAxiosAsync";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuthState, updateAuthState } from "@store/auth";
import asyncStorage, { Keys } from "@utils/asyncStorage";
import { useDispatch, useSelector } from "react-redux";
import useClient from "./useClient";

export interface SignInRes {
  profile: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    verified: boolean;

  };
  tokens: {
    refresh: string;
    access: string;
  }
}


type UserInfo = {
  email: string;
  password: string;
}

const useAuth = () => {
  const { authClient } = useClient()
  const dispatch = useDispatch();
  const authState = useSelector(getAuthState);

  const signIn = async (userInfo: UserInfo) => {
    dispatch(updateAuthState({ profile: null, pending: true }));
    const res = await runAxiosAsync<SignInRes>(
      client.post("/auth/sign-in", userInfo)
    )

    if (res) {
      // Store the tokens
      // await AsyncStorage.setItem("access-token", res.tokens.access)
      // await AsyncStorage.setItem("refresh-token", res.tokens.refresh)
      await asyncStorage.save(Keys.AUTH_TOKEN, res.tokens.access);
      await asyncStorage.save(Keys.REFRESH_TOKEN, res.tokens.refresh);
      dispatch(updateAuthState({
        profile: { ...res.profile, accessToken: res.tokens.access },
        pending: false,
      }
      ))
      console.log(res);
    } else {
      dispatch(updateAuthState({ profile: null, pending: false }));
    }
  }

  const signOut = async () => {
    // await asyncStorage.clear();
    // return

    const token = await asyncStorage.get(Keys.REFRESH_TOKEN)
    if (token) {
      dispatch(updateAuthState({ profile: authState.profile, pending: true }));
      await runAxiosAsync(
        authClient.post('/auth/sign-out', { refreshToken: token })
      )
      await asyncStorage.remove(Keys.REFRESH_TOKEN);
      await asyncStorage.remove(Keys.AUTH_TOKEN);
      dispatch(updateAuthState({ profile: null, pending: false}));

    }
  }

  const loggedIn = authState.profile ? true : false;

  return { signIn, signOut, authState, loggedIn }
};

export default useAuth;




// import client from "@app/api/client";
// import { runAxiosAsync } from "@app/api/runAxiosAsync";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getAuthState, updateAuthState } from "@store/auth";
// import asyncStorage, { Keys } from "@utils/asyncStorage";
// import { useDispatch, useSelector } from "react-redux";
// import useClient from "./useClient";

// export interface SignInRes {
//   profile: {
//     id: string;
//     name: string;
//     email: string;
//     avatar?: string;
//     verified: boolean;
//   };
//   tokens: {
//     refresh: string;
//     access: string;
//   }
// }

// type UserInfo = {
//   email: string;
//   password: string;
// }

// const useAuth = () => {
//   const { authClient } = useClient()
//   const dispatch = useDispatch();
//   const authState = useSelector(getAuthState);

//   const signIn = async (userInfo: UserInfo) => {
//     dispatch(updateAuthState({ profile: null, pending: true }));
//     const res = await runAxiosAsync<SignInRes>(
//       client.post("/auth/sign-in", userInfo)
//     )

//     if (res && res.tokens) {
//       // Store the tokens
//       await asyncStorage.save(Keys.AUTH_TOKEN, res.tokens.access);
//       await asyncStorage.save(Keys.REFRESH_TOKEN, res.tokens.refresh);
//       dispatch(updateAuthState({
//         profile: { ...res.profile, accessToken: res.tokens.access },
//         pending: false,
//       }))
//       console.log(res);
//     } else {
//       dispatch(updateAuthState({ profile: null, pending: false }));
//     }
//   }

//   const signOut = async () => {
//     // await asyncStorage.clear();
//     // return

//     const token = await asyncStorage.get(Keys.REFRESH_TOKEN)
//     if (token) {
//       dispatch(updateAuthState({ profile: authState.profile, pending: true }));
//       await runAxiosAsync(
//         authClient.post('/auth/sign-out', { refreshToken: token })
//       )
//       await asyncStorage.remove(Keys.REFRESH_TOKEN);
//       await asyncStorage.remove(Keys.AUTH_TOKEN);
//       dispatch(updateAuthState({ profile: null, pending: false}));

//     }
//   }

//   const loggedIn = authState.profile ? true : false;

//   return { signIn, signOut, authState, loggedIn }
// };

// export default useAuth;