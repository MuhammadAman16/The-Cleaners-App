import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import colors from "../config/colors";

function MemberLink({ text, onPress, link }) {
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.text}>{" " + link}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 100,
    justifyContent: "center",
  },
  text: {
    color: colors.primary,
    fontWeight: "bold",
  },
});

export default MemberLink;
