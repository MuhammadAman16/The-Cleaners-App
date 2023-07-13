import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SettingsScreen from "../screens/SettingsScreen";
import LogOut from "../screens/LogOut";
import colors from "../config/colors";

import FeedNavigator from "./FeedNavigator";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={FeedNavigator}
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
