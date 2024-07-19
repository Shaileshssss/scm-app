import { FC } from "react";
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { AntDesign } from '@expo/vector-icons'
import colors from "@utils/colors";


interface Props {
    antIconName: string;
    title: string;
    style?: StyleProp<ViewStyle>;
    onPress?(): void;
    active?: boolean;
}

const ProfileOptionListItem: FC<Props> = ({ antIconName, title, onPress, style, active }) => {
    return (
        <Pressable onPress={onPress} style={[styles.container, style]}>
            <View style={styles.buttonContainer}>
                <AntDesign
                    name={antIconName as any}
                    size={24}
                    color={active ? colors.active : colors.primary}
                />
                <Text style={[styles.title,
                { color: active ? colors.active : colors.primary },
                ]}
                >
                    {title}
                </Text>
            </View>

            {active && <View style={styles.indicator} />}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        paddingLeft: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    indicator: {
        width: 10,
        height: 10,
        backgroundColor: colors.active,
        borderRadius: 5,
    }

})

export default ProfileOptionListItem;