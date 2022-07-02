import { useEffect, useState } from 'react';

import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { View } from 'react-native';

import { CourierPrime_400Regular } from '@expo-google-fonts/courier-prime';
import Login from './src/screens/login';


export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync('Courier Prime', CourierPrime_400Regular)
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
      if(appIsReady) {
        await SplashScreen.hideAsync();
      }
    }

    hideSplash();
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Login />
  );
}