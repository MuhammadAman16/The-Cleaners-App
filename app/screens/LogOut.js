import React from "react";
import { StyleSheet } from "react-native";

// import useAuth from "../auth/useAuth";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import Screen from "../components/Screen";

function LogOut(props) {
  // const { logOut } = useAuth();

  return (
    <Screen style={styles.container}>
      <AppText style={styles.text}>Are you sure you want to logout?</AppText>

      <AppButton
        title={"YES"}
        onPress={() => {
          console.log("logout pressed");
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    padding: 20,
  },
  text: {
    paddingBottom: 10,
  },
});

export default LogOut;
