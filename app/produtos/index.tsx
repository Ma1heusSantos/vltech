import React from "react";
import { View } from "react-native";
import { Button } from "../../src/components/Button";
import { useTheme } from "@react-navigation/native";
import { AppTheme } from "@/src/constants/colorSchemes/theme";
import styles from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
import { Title } from "@/src/components/Title";

const Home: React.FC = () => {
  const { colors } = useTheme() as AppTheme;
  // const router = useRouter();

  return (
    <View style={styles.container}>
      <Title name="Produtos" showBack />
      <Button
        title="Abastecimento"
        icon={
          <MaterialCommunityIcons
            name="gas-station"
            size={24}
            color={colors.text_white}
          />
        }
        onPress={() => {}}
      />
      <Button
        title="Produtos"
        icon={
          <MaterialCommunityIcons
            name="basket"
            size={24}
            color={colors.text_white}
          />
        }
        onPress={() => {}}
      />
    </View>
  );
};

export default Home;
