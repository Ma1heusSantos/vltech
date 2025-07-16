import { MaterialIcons } from "@expo/vector-icons";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, Stack, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useMemo } from "react";
import "react-native-reanimated";
import { useColorScheme } from "react-native";
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_600SemiBold,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import {
  LightTheme as TemaLight,
  DarkTheme as TemaDark,
} from "@/src/constants/colorSchemes/theme";

import { RobotoMono_400Regular } from "@expo-google-fonts/roboto-mono";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

const fontConfig = {
  RobotoRegular: Roboto_400Regular,
  RobotoMedium: Roboto_500Medium,
  RobotoBold: Roboto_700Bold,
  Roboto_600SemiBold: Roboto_600SemiBold,
  RobotoMonoRegular: RobotoMono_400Regular,
  ...MaterialIcons.font,
};

SplashScreen.preventAutoHideAsync();

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

/**
 * Este é o componente de layout raiz.
 *
 * Ele define o tema com base na preferência de esquema de cores do usuário e renderiza
 * um navegador de pilha com duas telas: `(tabs)` e `modal`.
 *
 * Se o usuário navegar para o caminho raiz (`"/"`), será redirecionado para
 * o caminho `(tabs)/home`.
 */
function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();

  const theme = useMemo(
    () => (colorScheme === "dark" ? TemaDark : TemaLight),
    [colorScheme]
  );

  if (pathname === "/") {
    return <Redirect href="/(tabs)/home" />;
  }

  const stackScreens = useMemo(
    () => (
      <>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
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
