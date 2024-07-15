import colors from "@utils/colors";
import { FC } from "react";
import { View, StyleSheet,SafeAreaView, Image, Text} from "react-native"

interface Props {}

const heading = "Online Marketplace for Used Goods";
const subHeading = "Buy or sell used goods with trust. Chat directly with sellers"

const WelcomeHeader: FC<Props> = (props) => {
    return (
        <View style={styles.container}>
            <Image 
            source={require("../views/assets/hero.png")}
            style={styles.image}
            resizeMode="contain"
            resizeMethod="resize"
            />
            <Text style={styles.heading}>{heading}</Text>
            <Text style={styles.subHeading}>{subHeading}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    image: {
        width: 200,
        height:250,
    },
    heading : {
        fontWeight : "600",
        fontSize: 20,
        textAlign: "center",
        letterSpacing: 1,
        marginBottom: 5,
        color: colors.primary,
    },
    subHeading : {
        fontSize: 14,
        textAlign: "center",
        lineHeight: 14,
        color: "#000",
    }
})

export default WelcomeHeader;