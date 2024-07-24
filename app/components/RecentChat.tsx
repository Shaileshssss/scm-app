import AvatarView from "@app/ui/AvatarView";
import colors from "@utils/colors";
import { formatDate } from "@utils/date";
import size from "@utils/size";
import { FC } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";


interface Props {
    avatar?: string;
    name: string;
    timestamp: string;
    lastMessage: string;
}

const { width } = Dimensions.get('window')
const profileImageSize = 50;
const itemWidth = width - size.padding * 2

const RecentChat: FC<Props> = ({ avatar, timestamp, name, lastMessage }) => {
    return (
        <View style={styles.container}>
            <AvatarView uri={avatar}
                size={profileImageSize}
            />
            <View style={styles.chatInfo}>
                <View style={styles.flexJustifyBetween}>
                    <View style={styles.flex1}>
                        <Text style={styles.name}
                            numberOfLines={1}
                            ellipsizeMode="tail">{name}</Text>
                    </View>
                    <Text style={styles.commonText}
                        numberOfLines={1}
                        ellipsizeMode="tail">{formatDate(timestamp)}</Text>
                </View>

                <View style={styles.flexJustifyBetween}>
                    <View style={styles.flex1}>
                        <Text style={styles.commonText}
                            numberOfLines={2}
                            ellipsizeMode="tail">{lastMessage}</Text>
                    </View>
                    <View style={styles.msgIndicator}>
                    <Text style={styles.msgIndicatorCount}
                        numberOfLines={1}
                        ellipsizeMode="tail">{formatDate(timestamp)}</Text> 
                    </View>
                     
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: itemWidth,
    },
    name: {
        fontWeight: "bold",
        fontSize: 16,
        color: colors.primary,
        marginRight: size.padding,
    },
    chatInfo: {
        width: itemWidth - profileImageSize,
        paddingLeft: size.padding,
    },
    commonText: {
        fontSize: 12,
        color: colors.primary,
    },
    flexJustifyBetween: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
    },
    flex1: {
        flex: 1,

    },
    msgIndicatorCount: {
        fontSize: 12,
        color: colors.white,
    },
    msgIndicator: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: colors.active,
        alignItems: "center",
        justifyContent: "center"
    },
})

export default RecentChat;