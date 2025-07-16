import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, Alert } from "react-native";
import axios from "axios";
import Card from "../../../src/components/Card";
import { Button } from "../../../src/components/Button";
import { Bico } from "@/src/types/bicos";
import { useTheme } from "@react-navigation/native";
import { AppTheme } from "@/src/constants/colorSchemes/theme";
import { styles } from "./styles";

const Home: React.FC = () => {
  const [bicos, setBicos] = useState<Bico[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { colors } = useTheme() as AppTheme;

  useEffect(() => {
    axios
      .get<Bico[]>(
        "http://19979567000180.ddns.net:8098/api/svrpista/ultimosabast/1"
      )
      .then((res) => setBicos(res.data))
      .catch((err) => {
        console.error(err);
        Alert.alert("Erro", "Erro ao carregar os bicos");
      })
      .finally(() => setLoading(false));
  }, []);

  const handlePress = (bico: Bico) => {
    Alert.alert("Bico selecionado", `Você clicou no bico: ${bico.nome}`);
    // Aqui você poderia navegar ou abrir um modal
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1f2937" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={bicos}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <Card bico={item} onPress={handlePress} />}
      />
    </View>
  );
};

export default Home;
