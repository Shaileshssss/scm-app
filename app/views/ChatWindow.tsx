import BackButton from "@app/ui/BackButton";
import AppHeader from "@components/AppHeader";
import { FC } from "react";
import { StyleSheet, View } from "react-native";


interface Props{}

const ChatWindow: FC<Props> = (props) => {
    return (
        <View style={styles.container}>
            <AppHeader backButton={<BackButton />} />
        </View>
    )
}

const styles = StyleSheet.create({
container: {
    
}
})

export default ChatWindow