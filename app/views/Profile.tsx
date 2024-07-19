import { ProfileNavigatorParamList } from "@app/navigator/ProfileNavigator";
import AvatarView from "@app/ui/AvatarView";
import FormDivider from "@app/ui/FormDivider";
import ProfileOptionListItem from "@components/ProfileOptionListItem";
import useAuth from "@hooks/useAuth";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import colors from "@utils/colors";
import size from "@utils/size";
import { FC } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";


interface Props { }

const Profile: FC<Props> = (props) => {
    const { navigate } = useNavigation<NavigationProp<ProfileNavigatorParamList>>()
    const { authState, signOut } = useAuth()
    const { profile } = authState;

const onMessagePress = () => {
    navigate('Chats')
}

const onListingPress = () => {
    navigate('Listings')
}

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Profile image and info */}
            <View style={styles.profileContainer}>
                <AvatarView uri={profile?.avatar} size={80} />
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{profile?.name}</Text>
                    <Text style={styles.email}>{profile?.email}</Text>
                </View>
            </View>

            <FormDivider />

            <ProfileOptionListItem 
            style={styles.marginBottom}
             antIconName="message1" 
             title="Messages"
             onPress={onMessagePress}
             />
            <ProfileOptionListItem
            style={styles.marginBottom} 
            antIconName="appstore-o" 
            title="Your Listing"
            onPress={onListingPress}
             />
            <ProfileOptionListItem 
            antIconName="logout"
             title="Log Out" 
             onPress={signOut}
             />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: size.padding,
    },
    name: {
        color: colors.primary,
        fontSize: 20,
        fontWeight: 'bold',
    },
    email: {
        color: colors.primary,
        paddingTop: 2,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileInfo: {
        flex: 1,
        paddingLeft: size.padding,
    },
    marginBottom : {
        marginBottom : 15,
    },
})

export default Profile