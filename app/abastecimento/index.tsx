import React, { useCallback, useEffect, useState } from "react";
import { ToastAndroid, View, ActivityIndicator } from "react-native";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";

import getAllPump from "@/src/api/ListarBombas";
import { AppTheme } from "@/src/constants/colorSchemes/theme";
import { Title } from "@/src/components/Title";
import ListaComponente from "@/src/components/ListaComponente";
import { BombasData } from "@/src/types";
import styles from "./styles";

interface RawBombaData {
  numabast?: number;
  volumeabast?: number;
  codabast?: string;
  valorabast?: string | number;
}

interface ApiResponse {
  data?: RawBombaData[];
}

const AbastecimentoPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bombasData, setBombasData] = useState<BombasData[]>([]);
  const { colors } = useTheme() as AppTheme;

  const mapBombasData = useCallback((data: RawBombaData[]): BombasData[] => {
    return data.map((item, index) => ({
      id: String(item?.numabast ?? index + 1),
      type: item?.volumeabast ? `${item.volumeabast}L` : "",
      pump: item?.numabast ? `Bomba ${item.numabast}` : "",
      status: "Pendente" as const,
      code: String(item?.codabast ?? "000000000"),
      price: String(item?.valorabast ?? "0"),
    }));
  }, []);

  const fetchBombasData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response: ApiResponse | RawBombaData[] = await getAllPump();

      const data = Array.isArray(response) ? response : response?.data;

      if (!Array.isArray(data)) {
        throw new Error("Formato de dados inválido: esperado um array");
      }

      const mappedData = mapBombasData(data);
      setBombasData(mappedData);
    } catch (error) {
      console.error("Erro ao carregar bombas:", error);
      ToastAndroid.show(
        "Erro ao carregar bombas. Tente novamente mais tarde.",
        ToastAndroid.LONG
      );
      setBombasData([]);
    } finally {
      setIsLoading(false);
    }
  }, [mapBombasData]);

  const handleItemPress = useCallback((item: BombasData) => {
    router.push({
      pathname: "/carrinho",
      params: {
        bombasData: JSON.stringify(item),
      },
    });
  }, []);

  useEffect(() => {
    fetchBombasData();
  }, [fetchBombasData]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Title name="Abastecimento" showBack />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Title name="Abastecimento" showBack />
      <ListaComponente
        data={bombasData}
        useImage={false}
        onItemPress={handleItemPress}
      />
    </View>
  );
};

export default AbastecimentoPage;
