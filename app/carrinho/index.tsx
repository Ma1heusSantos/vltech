import React, { useMemo, useCallback, useRef } from "react";
import { Image, Text, View, ScrollView, Alert } from "react-native";
import { useTheme } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import { Modalize } from "react-native-modalize";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { AppTheme } from "@/src/constants/colorSchemes/theme";
import { Title } from "@/src/components/Title";
import { Button } from "@/src/components/Button";
import styles from "./styles";

import { NativeModules } from "react-native";
const { PayGo } = NativeModules;

const DEFAULT_PRODUCT_IMAGE =
  "https://s1.kuantokusta.pt/img_upload/produtos_gastronomiavinhos/28413_3_coca-cola-refrigerante-com-gas-33cl.jpg";

/**
 * 🔥 Normaliza qualquer tipo de preço vindo da API
 * Exemplo:
 * "5" → 500
 * "5.50" → 550
 * "5,50" → 550
 * "R$ 5,50" → 550
 * "05,500" → 5500
 */
function normalizarPreco(valor: any): number | null {
  if (!valor) return null;

  let str = String(valor).trim();

  // Remove letras e símbolos
  str = str.replace(/[^0-9.,]/g, "");

  // Converte vírgula para ponto
  str = str.replace(",", ".");

  const numero = parseFloat(str);

  if (isNaN(numero)) return null;

  return Math.round(numero * 100);
}

const CarrinhoPage: React.FC = () => {
  const { bombasData } = useLocalSearchParams();
  const { colors } = useTheme() as AppTheme;

  const modalizeRefOrdemPedido = useRef<Modalize>(null);

  /** Processa os dados recebidos */
  const parsedData = useMemo(() => {
    if (!bombasData || typeof bombasData !== "string") return null;

    try {
      return JSON.parse(bombasData);
    } catch {
      return null;
    }
  }, [bombasData]);

  if (!parsedData) {
    return (
      <View style={styles.container}>
        <Title name="Carrinho" showBack />
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons
            name="alert-circle"
            size={48}
            color={"red"}
            style={{ marginBottom: 16 }}
          />
          <Text style={styles.emptyText}>Dados não fornecidos.</Text>
        </View>
      </View>
    );
  }

  const item = {
    id: parsedData.id,
    title: parsedData.title || parsedData.name || "Produto",
    price: parsedData.price,
    icon: (
      <Image
        source={{ uri: DEFAULT_PRODUCT_IMAGE }}
        style={[styles.productImage, { backgroundColor: colors.fundo_escuro }]}
      />
    ),
  };

  /** 🔥 Handler do pagamento */
  const handlePaymentSelect = useCallback(async () => {
    modalizeRefOrdemPedido.current?.close();

    try {
      const valorCentavos = normalizarPreco(parsedData.price);

      if (valorCentavos === null) {
        Alert.alert("Erro", "Preço inválido recebido.");
        return;
      }

      console.log("🔵 Enviando valor para PayGo:", valorCentavos);

      const result = await PayGo.iniciarTransacao(
        String(valorCentavos),
        "CREDITO"
      );

      console.log("🟢 Retorno PayGo:", result);

      router.push({
        pathname: "/finalizar",
        params: { paygo: JSON.stringify(result) },
      });
    } catch (err) {
      console.log("🔴 Erro PayGo:", err);
      Alert.alert("Erro no pagamento", JSON.stringify(err));
    }
  }, [parsedData]);

  return (
    <View style={styles.container}>
      <Title name="Carrinho" showBack />

      <ScrollView contentContainerStyle={styles.itens}>
        <View style={styles.item}>
          <View style={styles.iconImage}>{item.icon}</View>
          <View style={styles.textContainer}>
            <Text style={styles.pumpText}>{item.title}</Text>
            <Text style={styles.statusText}>Preço: R$ {parsedData.price}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.totalPedido}>
        <Text style={styles.titlePedido}>Total</Text>
        <Text style={styles.totalNum}>R$ {parsedData.price}</Text>

        <Button
          title="CONTINUAR"
          color={colors.primary}
          onPress={() => modalizeRefOrdemPedido.current?.open()}
        />

        <Button
          title="CANCELAR"
          color={colors.destaque}
          onPress={() => router.back()}
        />
      </View>

      {/* Modal de seleção */}
      <Modalize ref={modalizeRefOrdemPedido} adjustToContentHeight>
        <View style={styles.modalContent}>
          <Text style={styles.titlePedido}>Forma de Pagamento</Text>

          <Button
            title="Pagar"
            color={colors.primary}
            onPress={handlePaymentSelect}
          />

          <Button
            title="Fechar"
            color={colors.error}
            onPress={() => modalizeRefOrdemPedido.current?.close()}
          />
        </View>
      </Modalize>
    </View>
  );
};

export default CarrinhoPage;
