import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "../config/colors";
import { NavigationContainer } from "@react-navigation/native";
import DCCheckOutScreen from "../screens/DCCheckOutScreen";
import HomeScreen from "../screens/HomeScreen";
import ReceiptScreen from "../screens/ReceiptScreen";
import OrderContext from "./OrderContext";

const Stack = createNativeStackNavigator();

const FeedNavigator = () => {
  const [order, setOrder] = useState(); // Move the useState hook here

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
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
        <Stack.Screen name="Receipt" component={ReceiptScreen} />
      </Stack.Navigator>
    </OrderContext.Provider>
  );
};

export default FeedNavigator;
