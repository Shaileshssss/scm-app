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
import { emailRegex } from '@utils/validator'
import { FC, useState } from 'react'
import { View, StyleSheet, Button, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { showMessage } from 'react-native-flash-message'

interface Props { }

const ForgetPassword: FC<Props> = (props) => {
    const [email, setEmail] = useState("")
    const [busy, setBusy] = useState(false);
    const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();

    const handleSubmit = async () => {
        if (!emailRegex.test(email)) {
            return showMessage({ message: "Invalid email Id!", type: 'danger' })
        }
        setBusy(true)
        const res = await runAxiosAsync<{ message: string }>(client.post('/auth/forget-pass', { email }))
        setBusy(false)
        if (res) {
            showMessage({ message: res.message, type: 'success' })
        }
    }
    return (
        // <KeyboardAvoidingView
        //     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        //     style={styles.container}
        //     keyboardVerticalOffset={50}
        // >

        //     <ScrollView>
        //         <View style={styles.innerContainer}>
        //             <WelcomeHeader />
        //             <View style={styles.formContainer}>
        //                 <FormInput placeholder='Email' keyboardType='email-address'
        //                     autoCapitalize='none' />

        //                 <AppButton title='Request Link' />

        //                 <FormDivider />

        //                 <FromNavigator
        //                     leftTitle='Sign Up' rightTitle='Sign In' />

        //             </View>
        //         </View>
        //     </ScrollView>

        // </KeyboardAvoidingView>
        <CustomKeyAvoidingView>
            <View style={styles.innerContainer}>
                <WelcomeHeader />
            </View>
            <View style={styles.formContainer}>
                <FormInput
                    placeholder='Email'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    value={email}
                    onChangeText={text => setEmail(text)}
                />

                <AppButton 
                active={!busy}
                 title={busy ? "Please wait" : "Request Link"}
                  onPress={handleSubmit}
                />
                <FormDivider />

                <FromNavigator onLeftPress={() => navigate("SignUp")}
                    onRightPress={() => navigate("SignIn")}
                    leftTitle='Sign Up'
                    rightTitle='Sign In'
                />
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

export default ForgetPassword;