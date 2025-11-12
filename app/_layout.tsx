import { ThemeProvider } from "@react-navigation/native";
import { Redirect, Stack, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useMemo, useState } from "react";
import "react-native-reanimated";
import { useColorScheme, View, ActivityIndicator } from "react-native";
import { LightTheme, DarkTheme } from "@/src/constants/colorSchemes/theme";
import * as Font from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "home",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    (async () => {
      try {
        await Font.loadAsync({
          "Roboto-Regular": require("../assets/fonts/Roboto_Condensed-Regular.ttf"),
          "Roboto-Medium": require("../assets/fonts/Roboto_Condensed-Medium.ttf"),
          "Roboto-Bold": require("../assets/fonts/Roboto_Condensed-Bold.ttf"),
          "Roboto-SemiBold": require("../assets/fonts/Roboto_Condensed-SemiBold.ttf"),
          "RobotoMono-Regular": require("../assets/fonts/Roboto_SemiCondensed-Regular.ttf"),
          "RobotoMono-Medium": require("../assets/fonts/Roboto_SemiCondensed-Medium.ttf"),
        });
        setFontsLoaded(true);
      } catch (err: any) {
        console.error("Erro ao carregar fontes:", err);
        setError(err);
      }
    })();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (error) throw error;

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1f2937" />
      </View>
    );
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();

  const theme = useMemo(
    () => (colorScheme === "dark" ? DarkTheme : LightTheme),
    [colorScheme]
  );

  if (pathname === "/") {
    return <Redirect href="/home" />;
  }

  const stackScreens = useMemo(
    () => (
      <>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
      </>
    ),
    []
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={theme}>
        <Stack screenOptions={{ headerShown: false }}>{stackScreens}</Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
