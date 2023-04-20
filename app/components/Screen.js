import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import Constants from "expo-constants";

function Screen({ children, style }) {
  return <SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 25,
    padding: 10,
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
});
export default Screen;
