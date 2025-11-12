import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import axios from "axios";
import Card from "@/src/components/Card";
import { Bico } from "@/src/types/index";
import { useRouter } from "expo-router";

const router = useRouter();

const index: React.FC = () => {
  const [bicos, setBicos] = useState<Bico[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get<Bico[]>(
        "http://19979567000180.ddns.net:8098/api/svrpista/ultimosabast/list"
      )
      .then((res) => {
        console.log("Resposta da API:", res.data);
        setBicos(res.data);
      })
      .catch((err) => {
        console.error(err);
        Alert.alert("Erro", "Erro ao carregar os bicos");
      })
      .finally(() => setLoading(false));
  }, []);

  const handlePress = (bico: Bico) => {
    router.push(`/produtos-combustiveis/${bico.codbico}`);
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
        keyExtractor={(item) => item.codbico.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <Card bico={item} onPress={handlePress} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    paddingTop: 20,
  },
  list: {
    paddingHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default index;
