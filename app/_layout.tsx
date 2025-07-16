import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, Stack, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useMemo } from "react";
import "react-native-reanimated";
import { useColorScheme } from "react-native";
import { LightTheme, DarkTheme } from "@/src/constants/colorSchemes/theme";
import { fontConfig } from "@/src/config/fontConfig";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

// Previne o auto-hide do splash screen
SplashScreen.preventAutoHideAsync();

/**
 * Este é o componente de layout raiz.
 *
 * Ele define o tema com base na preferência de esquema de cores do usuário e renderiza
 * um navegador de pilha com as telas: `index`, `home` e `modal`.
 *
 * Se o usuário navegar para o caminho raiz (`"/"`), será redirecionado para
 * o caminho `/home`.
 */
export default function RootLayout() {
  const [loaded, error] = useFonts(fontConfig);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
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

  // Redirecionar apenas se a rota atual for "/"
  if (pathname === "/") {
    return <Redirect href="/home" />;
  }

  const stackScreens = useMemo(
    () => (
      <>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", headerShown: false }}
        />
      </>
    ),
    []
  );

  return (
    <ThemeProvider value={theme}>
      <Stack screenOptions={{ headerShown: false }}>{stackScreens}</Stack>
    </ThemeProvider>
  );
}
