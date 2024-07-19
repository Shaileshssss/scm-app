import client from '@app/api/client'
import { runAxiosAsync } from '@app/api/runAxiosAsync'
import { AuthStackParamList } from '@app/navigator/AuthNavigator'
import AppButton from '@app/ui/AppButton'
import CustomKeyAvoidingView from '@app/ui/CustomKeyView'
import FormDivider from '@app/ui/FormDivider'
import FormInput from '@app/ui/Forminput'
import FromNavigator from '@app/ui/FormNavigator'
import WelcomeHeader from '@app/ui/WelcomeHeader'
import useAuth from '@hooks/useAuth'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import colors from '@utils/colors'
import { newUserSchema, yupValidate } from '@utils/validator'
import { FC, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { showMessage } from 'react-native-flash-message'


interface Props { }

const SignUp: FC<Props> = (props) => {
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [busy, setBusy] = useState(false)
    const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();
    const {signIn} = useAuth()

    const handleChange = (name: string) => (text: string) => {
        setUserInfo({ ...userInfo, [name]: text })
    }

    // const handleSubmit = () => {
    //     console.log(userInfo);

    // }

    const handleSubmit = async () => {

        const { values, error } = await yupValidate(newUserSchema, userInfo);

        if (error) return showMessage({ message: error, type: 'danger' })
        setBusy(true)
        const res = await runAxiosAsync<{ message: string }>(
            client.post("/auth/sign-up", values)
        )

        if (res?.message) {
            showMessage({ message: res.message, type: "success" });
            signIn(values!)
        }
        setBusy(false)
        console.log(res);
    };

    const { email, name, password } = userInfo

    return (
        <CustomKeyAvoidingView>
            <View style={styles.innerContainer}>
                <WelcomeHeader />

                <View style={styles.formContainer}>

                    <FormInput placeholder='Name'
                        value={name}
                        onChangeText={handleChange("name")}
                    />

                    <FormInput placeholder='Email'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        value={email}
                        onChangeText={handleChange("email")}
                    />
                    
                    <FormInput placeholder='Password'
                         value={password}
                        onChangeText={handleChange("password")} />

                    <AppButton active={!busy} title='Sign Up' onPress={handleSubmit} />

                    <FormDivider />

                    <FromNavigator onLeftPress={() => navigate("ForgetPassword")}
                        onRightPress={() => navigate("SignIn")}
                        leftTitle='Forget Password' rightTitle='Sign In'
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

export default SignUp;