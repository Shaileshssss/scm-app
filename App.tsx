import { Platform, SafeAreaView, StyleSheet, StatusBar, Modal } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colors from '@utils/colors';
import Navigator from '@app/navigator';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import store from '@store/index';


const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
  },
};

export default function App() {
  return (
    <Provider store={store}>
      {/* <Modal /> */}
    <SafeAreaView style={styles.container}>
      <Navigator />
      <FlashMessage position='top'/>
    </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop : Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
