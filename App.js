import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";

import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";

import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState();

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await restoreUser();
      } finally {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
