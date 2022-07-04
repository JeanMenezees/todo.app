import { useEffect, useState } from "react";

import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import { CourierPrime_400Regular } from "@expo-google-fonts/courier-prime";

import { NavigationContainer } from "@react-navigation/native";
import Root from "./src/routes/root";
import UsuarioProvider from "./src/contexts/usuario/usuario-context";
import TodoProvider from "./src/contexts/todo/todo-context";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync("Courier Prime", CourierPrime_400Regular);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    async function hideSplash() {
      if (appIsReady) {
        await SplashScreen.hideAsync();
      }
    }

    hideSplash();
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
}
