import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import LogOut from "../screens/LogOut";
import colors from "../config/colors";

import { Text, TouchableOpacity } from "react-native";

const Tab = createBottomTabNavigator();

const handleLogout = () => {
  console.log("logout");
};

export default function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarInactiveTintColor: colors.medium,
          tabBarActiveTintColor: colors.primary,
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarInactiveTintColor: colors.medium,
          tabBarActiveTintColor: colors.primary,
          headerShown: false,
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="LogOut"
        component={LogOut}
        options={{
          tabBarInactiveTintColor: colors.medium,
          tabBarActiveTintColor: colors.primary,
          headerShown: false,
          tabBarLabel: "LogOut",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="power" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
