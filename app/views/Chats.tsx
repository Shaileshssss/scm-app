import { runAxiosAsync } from "@app/api/runAxiosAsync";
import BackButton from "@app/ui/BackButton";
import EmptyView from "@app/ui/EmptyView";
import AppHeader from "@components/AppHeader";
import RecentChat from "@components/RecentChat";
import useClient from "@hooks/useClient";
import { getActiveChats } from "@store/chats";
import size from "@utils/size";
import { FC, useEffect } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { useSelector } from "react-redux";


interface Props { }

const Chats: FC<Props> = (props) => {
    const { authClient } = useClient()
    const chats = useSelector(getActiveChats);

    const fetchLastChats = async () => {
        const res = await runAxiosAsync<{
            chats: {
                id: string,
                lastMessage: string,
                timestamp: Date,
                unreadChatCounts: number,
                peerProfile: { id: string; name: string; avatar?: string };
            };
        }>(authClient('/conversation/last-chats'));

        if (res) {
            console.log(res.chats);
        }
    }

    useEffect(() => {
        fetchLastChats();
    }, []);

    if (!chats.length) return <>
        <AppHeader backButton={<BackButton />} />
        <EmptyView title="There is no chats." />
    </>

    return (
        <>
            <AppHeader backButton={<BackButton />} />
            <FlatList 
            data={chats}
            contentContainerStyle={styles.container}
            renderItem={({ item }) => (
                <RecentChat 
                name={item.peerProfile.name}
                avatar={item.peerProfile.avatar}
                timestamp={item.timestamp}
                lastMessage={item.lastMessage}
                />
            )}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
padding: size.padding,
    },
})

export default Chats;