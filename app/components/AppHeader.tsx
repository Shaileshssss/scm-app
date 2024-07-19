import { useNavigation } from "@react-navigation/native";
import size from "@utils/size";
import { FC } from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface Props{
    center?: JSX.Element | null;
    right?: JSX.Element | null;
    backButton?: JSX.Element | null;
}

const AppHeader: FC<Props> = ({center, right, backButton}) => {
    const {goBack, canGoBack} = useNavigation()
    return (
        <View style={syles.container}>
          {canGoBack() &&  <Pressable onPress={goBack}>
                {backButton}
            </Pressable>}

        </View>
    )
}

const syles = StyleSheet.create({
container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    padding: size.padding,
}
})

export default AppHeader;