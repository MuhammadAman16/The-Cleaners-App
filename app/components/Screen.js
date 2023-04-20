import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import Constants from "expo-constants";
import colors from "../config/colors";

function Screen({ children, style }) {
  return <SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 25,
    padding: 10,
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: colors.light,
  },
});
export default Screen;
