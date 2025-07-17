import React from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AppTheme } from "@/src/constants/colorSchemes/theme";
import styles from "./styles";
import { Title } from "@/src/components/Title";
import ListaComponente from "@/src/components/ListaComponente";
import { router } from "expo-router";

const Home: React.FC = () => {
  const { colors } = useTheme() as AppTheme;
  const fuelData = [
    {
      id: "1",
      type: "Etanol",
      pump: "Bomba 1",
      status: "Pendente",
      code: "012345",
    },
    {
      id: "2",
      type: "Diesel S10",
      pump: "Bomba 2",
      status: "Pendente",
      code: "012345",
    },
    {
      id: "3",
      type: "Gasolina Comum",
      pump: "Bomba 3",
      status: "Pendente",
      code: "012345",
    },
  ];

  return (
    <View style={styles.container}>
      <View>
        <Title name="Abastecimento" showBack />
      </View>
      <ListaComponente data={fuelData} useImage={false} onItemPress={() => router.push("/carrinho")}/>
    </View>
  );
};

export default Home;
