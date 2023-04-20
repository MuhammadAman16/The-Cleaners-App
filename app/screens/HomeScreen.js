import React from "react";
import { View, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import Card from "../components/Card";

function HomeScreen(props) {
  return (
    <Screen style={styles.container}>
      <Card
        imageUrl={
          "https://www.quiclolaundry.com/wp-content/uploads/2021/05/Best-Dry-Cleaning-Services-in-Hyderabad-Quiclo.jpg"
        }
        thumbnailUrl={
          "https://www.quiclolaundry.com/wp-content/uploads/2021/05/Best-Dry-Cleaning-Services-in-Hyderabad-Quiclo.jpg"
        }
        onPress={() => {
          console.log("clicked");
        }}
        title={"Dry Cleaning"}
        subTitle={"Leave Your Dirty Laundry to Us and We'll Make it Spotless!"}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default HomeScreen;
