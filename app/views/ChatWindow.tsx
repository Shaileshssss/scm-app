import { AppStackParamList } from "@app/navigator/AppNavigator";
import AvatarView from "@app/ui/AvatarView";
import BackButton from "@app/ui/BackButton";
import EmptyChatContainer from "@app/ui/EmptyChatContainer";
import PeerProfile from "@app/ui/PeerProfile";
import AppHeader from "@components/AppHeader";
import useAuth from "@hooks/useAuth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";


type Props = NativeStackScreenProps<AppStackParamList, 'ChatWindow'>;

const ChatWindow: FC<Props> = ({route}) => {
    const {authState} = useAuth()
    const {conversationId, peerProfile} = route.params

const profile = authState.profile;

if(!profile) return null;

    return (
        <View style={styles.container}>
            <AppHeader backButton={<BackButton />} 
            center={
                <PeerProfile name={peerProfile.name} avatar={peerProfile.avatar}/>
            }
            />

            <GiftedChat 
            messages={[]}
            user={{
                _id: profile.id,
                name: profile.name,
                avatar: profile.avatar
            }}
            onSend={handleOnMessageSend}
            renderChatEmpty={() => <EmptyChatContainer/>
                
            }
            />
        </View>
    )
}

const styles = StyleSheet.create({
container: {
    flex:1,
}
})

export default ChatWindow;