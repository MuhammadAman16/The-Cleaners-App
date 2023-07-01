import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import HomeScreen from "./app/screens/HomeScreen";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";
import ListingEditScreen from "./app/screens/DC_CheckOut";

export default function App() {
  return (
    <NavigationContainer>
      <ListingEditScreen />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
