import { MaterialIcons } from "@expo/vector-icons";

export const fontConfig = {
  Roboto_400Regular: require("../../assets/fonts/Roboto_Condensed-Regular.ttf"),
  Roboto_500Medium: require("../../assets/fonts/Roboto_Condensed-Medium.ttf"),
  Roboto_700Bold: require("../../assets/fonts/Roboto_Condensed-Bold.ttf"),
  Roboto_600SemiBold: require("../../assets/fonts/Roboto_Condensed-SemiBold.ttf"),
  RobotoMono_400Regular: require("../../assets/fonts/Roboto_SemiCondensed-Regular.ttf"),
  RobotoMono_500Medium: require("../../assets/fonts/Roboto_SemiCondensed-Medium.ttf"),
  ...MaterialIcons.font,
};
