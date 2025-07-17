import React from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AppTheme } from "@/src/constants/colorSchemes/theme";
import styles from "./styles";
// import { useRouter } from "expo-router";
import { Title } from "@/src/components/Title";
import ListaComponente from "@/src/components/ListaComponente";

const Home: React.FC = () => {
  const { colors } = useTheme() as AppTheme;
  // const router = useRouter();
  const refriData = [
    {
      id: "1",
      type: "Coca-Cola",
      pump: "Refrigerante",
      status: "R$ 08,35",
      code: "023456",
    },
    {
      id: "2",
      type: "Coca-Cola",
      pump: "Refrigerante",
      status: "R$ 08,35",
      code: "023456",
    },
    {
      id: "3",
      type: "Coca-Cola",
      pump: "Refrigerante",
      status: "R$ 08,35",
      code: "023456",
    },
    {
      id: "4",
      type: "Coca-Cola",
      pump: "Refrigerante",
      status: "R$ 08,35",
      code: "023456",
    },
    {
      id: "5",
      type: "Coca-Cola",
      pump: "Refrigerante",
      status: "R$ 08,35",
      code: "023456",
    },
    {
      id: "6",
      type: "Coca-Cola",
      pump: "Refrigerante",
      status: "R$ 08,35",
      code: "023456",
    },
    {
      id: "7",
      type: "Coca-Cola",
      pump: "Refrigerante",
      status: "R$ 08,35",
      code: "023456",
    },
    {
      id: "8",
      type: "Coca-Cola",
      pump: "Refrigerante",
      status: "R$ 08,35",
      code: "023456",
    },
    {
      id: "9",
      type: "Coca-Cola",
      pump: "Refrigerante",
      status: "R$ 08,35",
      code: "023456",
    },
    {
      id: "10",
      type: "Coca-Cola",
      pump: "Refrigerante",
      status: "R$ 08,35",
      code: "023456",
    },
  ];

  return (
    <View style={styles.container}>
      <View>
        <Title name="Produtos" showBack />
      </View>
      <ListaComponente
        data={refriData}
        useImage={true}
        imageSource="https://s1.kuantokusta.pt/img_upload/produtos_gastronomiavinhos/28413_3_coca-cola-refrigerante-com-gas-33cl.jpg"
      />
    </View>
  );
};

export default Home;
