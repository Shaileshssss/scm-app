import { ProfileNavigatorParamList } from "@app/navigator/ProfileNavigator";
import AvatarView from "@app/ui/AvatarView";
import FormDivider from "@app/ui/FormDivider";
import ProfileOptionListItem from "@components/ProfileOptionListItem";
import useAuth from "@hooks/useAuth";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import colors from "@utils/colors";
import size from "@utils/size";
import { FC, useState } from "react";
import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { AntDesign } from '@expo/vector-icons'
import useClient from "@hooks/useClient";
import { runAxiosAsync } from "@app/api/runAxiosAsync";
import { ProfileRes } from "@app/navigator";
import { useDispatch } from "react-redux";
import { isPending } from "@reduxjs/toolkit";
import { updateAuthState } from "@store/auth";
import { showMessage } from "react-native-flash-message";
import { selectImages } from "@utils/helpers";
import mime from 'mime'
import LoadingSpinner from "@app/ui/LoadingSpinner";


interface Props { }

const Profile: FC<Props> = (props) => {
    const { navigate } = useNavigation<NavigationProp<ProfileNavigatorParamList>>()
    const { authState, signOut } = useAuth()
    const [busy, setBusy] = useState(false)
    const [updateingAvatar, setUpdatingAvatar] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const { profile } = authState;
    const dispatch = useDispatch();
    const [userName, setUserName] = useState(profile?.name || '');
    const { authClient } = useClient()

    const isNameChanged = profile?.name !== userName && userName.trim().length >= 3

    const onMessagePress = () => {
        navigate('Chats')
    }

    const onListingPress = () => {
        navigate('Listings')
    }

    const fetchProfile = async () => {
        const res = await runAxiosAsync<{ profile: ProfileRes }>(
            authClient.get('/auth/profile')
        )
        setBusy(false);
        if (res) {
            dispatch(updateAuthState({
                profile: { ...profile!, ...res.profile },
                pending: false,
            }
            ))
        }
    }

    const getVerificationLink = async () => {
        setRefreshing(true)
        const res = await runAxiosAsync<{ message: string }>(
            authClient.get("/auth/verify-token")
        );
        setRefreshing(false)
        if (res) {
            showMessage({ message: res.message, type: "success" })
        }
    };

    const handleProfileImageSelection = async () => {
        const [image] = await selectImages({
            allowsMultipleSelection: false,
            allowsEditing: true,
            aspect: [1, 1],
        })
        if (image) {
            const formData = new FormData();
            formData.append("avatar", {
                name: "Avatar",
                uri: image,
                type: mime.getType(image),
            } as any);

            setUpdatingAvatar(true);
            const res = await runAxiosAsync<ProfileRes>
                (authClient.patch('/auth/update-avatar', formData)
                );
            setUpdatingAvatar(false);
            if (res) {
                dispatch(
                    updateAuthState({
                        profile: { ...profile!, ...res.profile },
                        pending: false,
                    })
                )
            }
        }
    }

    const updateProfile = async () => {
        const res = await runAxiosAsync<{ profile: ProfileRes }>(
            authClient.patch('/auth/update-profile', { name: userName })
        )
        if (res) {
            showMessage({ message: "Name updated successfully.", type: 'success' })
            dispatch(updateAuthState
                ({
                    pending: false,
                    profile: { ...profile!, ...res.profile }
                }))
        }

    };

    return (
        <ScrollView refreshControl={<RefreshControl
            refreshing={refreshing}
            onRefresh={fetchProfile}
        />
        }
            contentContainerStyle={styles.container}>
            {!profile?.verified && (<View style={styles.verificationLinkContainer}>
                <Text style={styles.verificationTitle}>It look like your profile is not verified</Text>

                {busy ? (<Text style={styles.verificationLink}>Please wait...</Text>) :
                    (<Text onPress={getVerificationLink} style={styles.verificationLink}>
                        Tap here to get the link
                    </Text>)
                }

            </View>
            )}
            {/* Profile image and info */}
            <View style={styles.profileContainer}>
                <AvatarView uri={profile?.avatar} size={80} onPress={handleProfileImageSelection} />
                <View style={styles.profileInfo}>
                    <View style={styles.nameContainer}>
                        <TextInput
                            value={userName}
                            onChangeText={(text) => setUserName(text)}
                            style={styles.name}
                        />
                        {isNameChanged && (
                            <Pressable onPress={updateProfile}>
                                <AntDesign name="check" size={24} color={colors.primary} />
                            </Pressable>
                        )}
                    </View>

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
            <LoadingSpinner visible={updateingAvatar} />
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
    marginBottom: {
        marginBottom: 15,
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    verificationLinkContainer: {
        padding: 10,
        backgroundColor: colors.deActive,
        marginVertical: 10,
        borderRadius: 5,
    },
    verificationTitle: {
        fontWeight: '600',
        color: colors.primary,
        textAlign: "center"
    },
    verificationLink: {
        color: colors.active,
        fontWeight: "600",
        textAlign: "center",
        paddingTop: 5,
    }
})

export default Profile