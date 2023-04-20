import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import colors from "../config/colors";

function LinkButton({ onClick, link }) {
  return (
    <TouchableOpacity onPress={onClick}>
      <Text style={styles.link}>{link}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  link: {
    right: 10,
    position: "absolute",
    color: colors.primary,
    marginTop: 5,
  },
});

export default LinkButton;
