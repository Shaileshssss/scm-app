import client from '@app/api/client'
import { runAxiosAsync } from '@app/api/runAxiosAsync'
import { AuthStackParamList } from '@app/navigator/AuthNavigator'
import AppButton from '@app/ui/AppButton'
import CustomKeyAvoidingView from '@app/ui/CustomKeyView'
import FormDivider from '@app/ui/FormDivider'
import FormInput from '@app/ui/Forminput'
import FromNavigator from '@app/ui/FormNavigator'
import WelcomeHeader from '@app/ui/WelcomeHeader'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import colors from '@utils/colors'
import { newUserSchema, signInSchema, yupValidate } from '@utils/validator'
import axios from 'axios'
import { FC, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { showMessage } from 'react-native-flash-message'

interface Props { }

export interface SignInRes {
  profile: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    verified:boolean;

  };
  tokens: {
    refresh: string;
    access: string;
  }
}

const SignIn: FC<Props> = (props) => {
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: ""
  })
  const [busy, setBusy] = useState(false)

  const handleSubmit = async () => {

    const { values, error } = await yupValidate(signInSchema, userInfo);

    if (error) return showMessage({ message: error, type: 'danger' })
    setBusy(true)
    const res = await runAxiosAsync<SignInRes>(
      client.post("/auth/sign-in", values)
    )

    if (res){
      // Store the tokens
      console.log(res);
      
    }
    setBusy(false)
  };

  const handleChange = (name: string) => (text: string) => {
    setUserInfo({ ...userInfo, [name]: text })
  }

  const { email, password } = userInfo

  return (
    <CustomKeyAvoidingView>
      <View style={styles.innerContainer}>
        <WelcomeHeader />
        <View style={styles.formContainer}>
          <FormInput placeholder='Email'
            keyboardType='email-address'
            autoCapitalize='none'
            value={email} onChangeText={handleChange("email")} />
          <FormInput placeholder='Password'
            secureTextEntry
            value={password} onChangeText={handleChange("password")} />

          <AppButton active={!busy} title='Sign In' onPress={handleSubmit}/>

          <FormDivider />

          <FromNavigator onLeftPress={() => navigate('ForgetPassword')}
            onRightPress={() => navigate("SignUp")}
            leftTitle='Forget Password' rightTitle='Sign Up'
          />

        </View>
      </View>
    </CustomKeyAvoidingView>
  )


}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  innerContainer: {
    padding: 15,
    flex: 1,
  },
  input: {
    width: "100%",
    padding: 8,
    borderRadius: 5,
    marginBottom: 15,
    color: colors.primary,
    borderWidth: 1,
  },
  formContainer: {
    marginTop: 25,
  },


})

export default SignIn