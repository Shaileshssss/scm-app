import { FC } from "react";
import { Text, View, StyleSheet } from "react-native";



interface Props {}

const Home: FC<Props> = (props) => {
    return (
        <View style={styles.container}>
            <Text>Home</Text>
        </View>
    )
};

const styles = StyleSheet.create({
container:{}
})

export default Home;