import React from "react";
import { View } from "react-native";
import { Button } from "../../src/components/Button";
import { useTheme } from "@react-navigation/native";
import { AppTheme } from "@/src/constants/colorSchemes/theme";
import styles from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Title } from "@/src/components/Title";
import { Subtitle } from "@/src/components/Subtitle";

const Home: React.FC = () => {
  const { colors } = useTheme() as AppTheme;
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title name="Serviços" />
        <Subtitle name="Esta é a bomba de combustível que você utilizou para encher o tanque e que irá pagar." />
      </View>
      <Button
        title="Abastecimento"
        icon={
          <MaterialCommunityIcons
            name="gas-station"
            size={24}
            color={colors.text_white}
          />
        }
        style={{ marginBottom: 10 }}
        onPress={() => router.push("/abastecimento")}
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
        onPress={() => router.push("/produtos")}
      />
    </View>
  );
};

export default Home;
