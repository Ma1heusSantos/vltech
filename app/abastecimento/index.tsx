import React, { useEffect, useState } from "react";
import getAllPump from "@/src/api/ListarBombas";
import { ToastAndroid, View, ActivityIndicator } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AppTheme } from "@/src/constants/colorSchemes/theme";
import styles from "./styles";
import { Title } from "@/src/components/Title";
import ListaComponente from "@/src/components/ListaComponente";
import { router } from "expo-router";
import { BombasData } from "@/src/types";

const AbastecimentoPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bombasData, setBombasData] = useState<BombasData[]>([]);
  const { colors } = useTheme() as AppTheme;

  const mapBombasData = (data: any[]): BombasData[] =>
    data.map((item, index) => ({
      id: String(item?.numabast || index + 1),
      type: `${item?.volumeabast || ""}L`,
      pump: `Bomba ${item?.numabast || ""}`,
      status: "Pendente",
      code: String(item?.codabast || "000000000"),
      price: String(item?.valorabast),
    }));

  const fetchListarBombas = async () => {
    try {
      setIsLoading(true);
      const response = await getAllPump();
      const data = response?.data ?? response;

      if (!Array.isArray(data))
        throw new Error("Dados inválidos. Esperado um array.");

      setBombasData(
        mapBombasData(data).map((item) => ({
          ...item,
        }))
      );
    } catch (error) {
      console.log("Erro ao carregar bombas:", error);
      ToastAndroid.show(
        "Erro ao carregar bombas. Tente novamente.",
        ToastAndroid.LONG
      );
      setBombasData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListarBombas();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Title name="Abastecimento" showBack />
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <ListaComponente
          data={bombasData}
          useImage={false}
          onItemPress={(item: BombasData) =>
            router.push({
              pathname: "/carrinho",
              params: {
                bombasData: JSON.stringify(item),
              },
            })
          }
        />
      )}
    </View>
  );
};

export default AbastecimentoPage;
