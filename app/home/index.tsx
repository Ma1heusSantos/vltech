import React, { useCallback } from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Button } from "../../src/components/Button";
import { Title } from "@/src/components/Title";
import { Subtitle } from "@/src/components/Subtitle";
import { AppTheme } from "@/src/constants/colorSchemes/theme";
import { styles } from "./styles";

interface ServiceButton {
  readonly title: string;
  readonly iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  readonly route: string;
  readonly style?: object;
}

const SERVICE_BUTTONS: readonly ServiceButton[] = [
  {
    title: "Abastecimento",
    iconName: "gas-station",
    route: "/abastecimento",
    style: { marginBottom: 10 },
  },
  {
    title: "Produtos",
    iconName: "basket",
    route: "/produtos",
  },
] as const;

const HomePage: React.FC = () => {
  const { colors } = useTheme() as AppTheme;
  const router = useRouter();

  const handleNavigation = useCallback(
    (route: string) => () => router.push(route as any),
    [router]
  );

  const renderServiceButton = useCallback(
    ({ title, iconName, route, style }: ServiceButton) => (
      <Button
        key={title}
        title={title}
        icon={
          <MaterialCommunityIcons
            name={iconName}
            size={24}
            color={colors.text_white}
          />
        }
        style={style}
        onPress={handleNavigation(route)}
      />
    ),
    [colors.text_white, handleNavigation]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title name="Serviços" />
        <Subtitle name="Para prosseguir, por favor, selecione um serviço abaixo." />
      </View>
      {SERVICE_BUTTONS.map(renderServiceButton)}
    </View>
  );
};

export default HomePage;
