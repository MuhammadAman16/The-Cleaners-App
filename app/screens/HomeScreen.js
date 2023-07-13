import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import Screen from "../components/Screen";
import Card from "../components/Card";
import routes from "../navigation/routes";

function HomeScreen({ navigation }) {
  return (
    <Screen style={styles.container}>
      <ScrollView>
        <Card
          imageUrl={
            "https://www.quiclolaundry.com/wp-content/uploads/2021/05/Best-Dry-Cleaning-Services-in-Hyderabad-Quiclo.jpg"
          }
          thumbnailUrl={
            "https://www.quiclolaundry.com/wp-content/uploads/2021/05/Best-Dry-Cleaning-Services-in-Hyderabad-Quiclo.jpg"
          }
          onPress={() => {
            navigation.navigate(routes.DC_CHECKOUT);
          }}
          title={"Dry Cleaning"}
          subTitle={
            "Leave Your Dirty Laundry to Us and We'll Make it Spotless!"
          }
        />
        <Card
          imageUrl={
            "https://www.starletcleaning.co.uk/wp-content/uploads/25349851_s.jpg"
          }
          thumbnailUrl={
            "https://www.starletcleaning.co.uk/wp-content/uploads/25349851_s.jpg"
          }
          onPress={() => {
            navigation.navigate(routes.DC_CHECKOUT);
          }}
          title={"Ironing"}
          subTitle={"We press so that you could impress!"}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default HomeScreen;
