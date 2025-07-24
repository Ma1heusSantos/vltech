import { MaterialIcons } from "@expo/vector-icons";
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_600SemiBold,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import {
  RobotoMono_400Regular,
  RobotoMono_500Medium,
} from "@expo-google-fonts/roboto-mono";

export const fontConfig = {
  RobotoRegular: Roboto_400Regular,
  RobotoMedium: Roboto_500Medium,
  RobotoBold: Roboto_700Bold,
  Roboto_600SemiBold: Roboto_600SemiBold,
  RobotoMonoRegular: RobotoMono_400Regular,
  RobotoMonoMedium: RobotoMono_500Medium,
  ...MaterialIcons.font,
};

export {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_600SemiBold,
  Roboto_700Bold,
  RobotoMono_400Regular,
  RobotoMono_500Medium,
};
