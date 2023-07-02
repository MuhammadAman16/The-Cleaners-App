import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import colors from "../config/colors";
import { NavigationContainer } from "@react-navigation/native";
import DCCheckOutScreen from "../screens/DCCheckOutScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      animation: "slide_from_bottom",
      gestureEnabled: true,
    }}
  >
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen
      name="DCCheckOut"
      component={DCCheckOutScreen}
      options={{ title: "", headerTintColor: colors.primary }}
    />
  </Stack.Navigator>
);

export default FeedNavigator;
