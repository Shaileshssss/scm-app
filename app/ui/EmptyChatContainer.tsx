import colors from "@utils/colors";
import size from "@utils/size";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";


interface Props {}

const EmptyChatContainer: FC<Props> =(props) => {
    return (
        <View style={styles.container}>
            <View style={styles.messageContainer}>
            <Text style={styles.message}>
                Breaking
            </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: size.padding,
    transform: [{ rotate: "180deg" }, {rotateY: "-180deg"}],
},
messageContainer : {
    backgroundColor: colors.deActive,
    padding: size.padding,
    borderRadius:5
},
message: {
    color: colors.active,
    fontSize: 12,
    textAlign: "center",
}

});

export default EmptyChatContainer