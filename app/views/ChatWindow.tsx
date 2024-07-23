import { AppStackParamList } from "@app/navigator/AppNavigator";
import socket from "@app/socket";
import AvatarView from "@app/ui/AvatarView";
import BackButton from "@app/ui/BackButton";
import EmptyChatContainer from "@app/ui/EmptyChatContainer";
import PeerProfile from "@app/ui/PeerProfile";
import AppHeader from "@components/AppHeader";
import useAuth from "@hooks/useAuth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Conversation, selectConversationById, updateConversation } from "@store/conversation";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { useDispatch, useSelector } from "react-redux";


type Props = NativeStackScreenProps<AppStackParamList, 'ChatWindow'>;

type OutGoingMessage = {
    message: {
        id: string;
        time: string;
        text: string;
        user: {
            id: string,
            name: string,
            avatar?: string,
            
        }
    },
    to: string,
    conversationId: string
};

const getTime = (value: IMessage['createdAt']) => {
    if(value instanceof Date) return value.toISOString();
    return new Date(value).toISOString()
}

const formatConverstionToIMessage = (value?: Conversation): IMessage[] => {
  const formattedValues = value?.chats.map(chat => {
        return {
            _id: chat.id,
            text: chat.text,
            createdAt: new Date(chat.time),
            user: {
                _id: chat.user.id,
                name: chat.user.name,
                avatar: chat.user.avatar,
            },
        };
    });

    const messages = formattedValues || [];
    return messages.sort((a, b) =>
    b.createdAt.getTime() - a.createdAt.getTime())
}

const ChatWindow: FC<Props> = ({ route }) => {
    const { authState } = useAuth()
    const { conversationId, peerProfile } = route.params;
    const chats = useSelector(selectConversationById(conversationId));
    const dispatch = useDispatch();
    const profile = authState.profile;

    const handleOnMessageSend = (messages: IMessage[]) => {
        if(!profile) return;
        const currentMessage = messages[messages.length - 1]
        const newMessage: OutGoingMessage ={
            message: {
                id: currentMessage._id.toString(),
                text: currentMessage.text,
                time: getTime(currentMessage.createdAt),
                user: {id: profile.id, name: profile.name, avatar: profile.avatar}
            },
            conversationId,
            to: peerProfile.id
        }
        // this will update our store and also update UI
        dispatch(
            updateConversation
            ({
            conversationId, 
            chat: newMessage.message, 
            peerProfile
        })
    )
        // Sending message to our api
        socket.emit("chat:new", newMessage);
    };

    if (!profile) return null;

    return (
        <View style={styles.container}>
            <AppHeader backButton={<BackButton />}
                center={
                    <PeerProfile name={peerProfile.name} avatar={peerProfile.avatar} />
                }
            />

            <GiftedChat
                messages={formatConverstionToIMessage(chats)}
                user={{
                    _id: profile.id,
                    name: profile.name,
                    avatar: profile.avatar
                }}
                onSend={handleOnMessageSend}
                renderChatEmpty={() => <EmptyChatContainer />

                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default ChatWindow;