import React from "react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";
import { bool } from "yup";

function ActivityIndicator({ visible = false }) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <AppText style={styles.text}>Placing your order...</AppText>
    </View>
  );
}
const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    backgroundColor: "white",
    height: "100%",
    opacity: 1,
    width: "100%",
    zIndex: 1,
  },
  text: {
    fontSize: 30,
    color: colors.primary,
    fontWeight: "bold",
  },
});

export default ActivityIndicator;
