import React from "react";
import { FlatList, Text, View } from "react-native";
import { Button } from "../../src/components/Button";
import { useTheme } from "@react-navigation/native";
import { AppTheme } from "@/src/constants/colorSchemes/theme";
import styles from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
import { Title } from "@/src/components/Title";
import ListaComponente from "@/src/components/ListaComponente";

const Home: React.FC = () => {
  const { colors } = useTheme() as AppTheme;
  // const router = useRouter();
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
      <ListaComponente data={fuelData} />

      {/* <FlatList
        data={bombasMock}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>
              #{item.nome} - {item.combustivel}
            </Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      /> */}
    </View>
  );
};

export default Home;
