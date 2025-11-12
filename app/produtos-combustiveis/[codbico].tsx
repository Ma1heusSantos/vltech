import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

export default function ProdutosCombustiveis() {
  const layout = useWindowDimensions();

  const [dados, setDados] = useState<{ produtos: any[]; combustiveis: any[] }>({
    produtos: [],
    combustiveis: [],
  });
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "produtos", title: "Produtos" },
    { key: "combustiveis", title: "Combustíveis" },
  ]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [produtosRes, combustiveisRes] = await Promise.all([
          fetch("https://suaapi.com/produtos"),
          fetch("https://suaapi.com/combustiveis"),
        ]);
        const produtos = await produtosRes.json();
        const combustiveis = await combustiveisRes.json();
        setDados({ produtos, combustiveis });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 20 }} />;

  const ProdutosRoute = () => (
    <FlatList
      contentContainerStyle={{ padding: 16 }}
      data={dados.produtos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Text style={{ marginBottom: 8 }}>{item.nome}</Text>
      )}
    />
  );

  const CombustiveisRoute = () => (
    <FlatList
      contentContainerStyle={{ padding: 16 }}
      data={dados.combustiveis}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Text style={{ marginBottom: 8 }}>{item.nome}</Text>
      )}
    />
  );

  const renderScene = SceneMap({
    produtos: ProdutosRoute,
    combustiveis: CombustiveisRoute,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: "#1E90FF", height: 3 }} // linha abaixo da aba ativa
          style={{ backgroundColor: "#1E90FF", elevation: 2 }} // fundo das abas
          tabStyle={{ flex: 1, marginTop: 24 }} // para ajustar largura automática
        />
      )}
    />
  );
}
