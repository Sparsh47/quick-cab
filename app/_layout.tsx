import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useEffect, useCallback, useState } from "react";
import { View } from "react-native";
import * as Font from "expo-font";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
          "Jakarta-BoldItalic": require("../assets/fonts/PlusJakartaSans-BoldItalic.ttf"),
          "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
          "Jakarta-ExtraBoldItalic": require("../assets/fonts/PlusJakartaSans-ExtraBoldItalic.ttf"),
          "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
          "Jakarta-ExtraLightItalic": require("../assets/fonts/PlusJakartaSans-ExtraLightItalic.ttf"),
          "Jakarta-Italic": require("../assets/fonts/PlusJakartaSans-Italic.ttf"),
          "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
          "Jakarta-LightItalic": require("../assets/fonts/PlusJakartaSans-LightItalic.ttf"),
          "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
          "Jakarta-MediumItalic": require("../assets/fonts/PlusJakartaSans-MediumItalic.ttf"),
          "Jakarta-Regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
          "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
          "Jakarta-SemiBoldItalic": require("../assets/fonts/PlusJakartaSans-SemiBoldItalic.ttf"),
        });

        setFontsLoaded(true);
      } catch (e) {
        console.warn("Font loading error:", e);
      }
    }

    loadFonts();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Stack>
        <Stack.Screen name="(root)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </View>
  );
}
