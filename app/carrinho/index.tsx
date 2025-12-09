// app/carrinho.tsx
import React, { useMemo, useCallback, useRef } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";
import { Modalize } from "react-native-modalize";

import { AppTheme } from "@/src/constants/colorSchemes/theme";
import { Title } from "@/src/components/Title";
import { Button } from "@/src/components/Button";
import { useCart } from "@/src/context/CartContext";
import styles from "./styles";

import { NativeModules } from "react-native";
const { PayGo } = NativeModules;

function formatPriceBRL(value: number): string {
  return value.toFixed(2).replace(".", ",");
}

const CarrinhoPage: React.FC = () => {
  const { colors } = useTheme() as AppTheme;
  const {
    items,
    total,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const modalizeRef = useRef<Modalize>(null);

  const totalCentavos = useMemo(() => Math.round(total * 100), [total]);

  const handleConfirmPayment = useCallback(
    async (paymentMode: string) => {
      if (!PayGo) {
        Alert.alert(
          "Integração",
          "Módulo PayGo não disponível no NativeModules."
        );
        return;
      }

      if (totalCentavos <= 0) {
        Alert.alert("Carrinho vazio", "Adicione itens antes de pagar.");
        return;
      }

      try {
        const valor = String(totalCentavos);
        console.log("🔵 Enviando para PayGo:", valor, paymentMode);

        const result = await PayGo.iniciarTransacao(
          valor,
          paymentMode,
          "99697"
        );
        console.log("🟢 Retorno PayGo:", result);

        clearCart();

        router.push({
          pathname: "/finalizar",
          params: { paygo: JSON.stringify(result) },
        });
      } catch (error) {
        console.log("🔴 Erro PayGo:", error);
        Alert.alert("Erro no pagamento", JSON.stringify(error));
      }
    },
    [totalCentavos, clearCart]
  );

  const handleFinishPress = useCallback(() => {
    if (items.length === 0) {
      Alert.alert("Carrinho vazio", "Adicione algum item antes de continuar.");
      return;
    }
    modalizeRef.current?.open();
  }, [items]);

  const renderItem = ({ item }: any) => (
    <View style={styles.itemRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemPrice}>
          R$ {formatPriceBRL(item.price)} x {item.quantity} ={" "}
          <Text style={styles.itemSubtotal}>
            R$ {formatPriceBRL(item.price * item.quantity)}
          </Text>
        </Text>
      </View>

      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.qtyButton}
          onPress={() => decreaseQuantity(item.id)}
        >
          <Text style={styles.qtyButtonText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.qtyText}>{item.quantity}</Text>

        <TouchableOpacity
          style={styles.qtyButton}
          onPress={() => increaseQuantity(item.id)}
        >
          <Text style={styles.qtyButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeItem(item.id)}
      >
        <Text style={styles.removeText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <Title name="Carrinho" showBack />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
          <Button
            title="Ver produtos"
            color={colors.primary}
            onPress={() => router.push("/produtos")}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Title name="Carrinho" showBack />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={renderItem}
      />

      <View style={styles.footer}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalValue}>R$ {formatPriceBRL(total)}</Text>

        <Button
          title="FINALIZAR COMPRA"
          color={colors.primary}
          onPress={handleFinishPress}
        />

        <Button
          title="LIMPAR CARRINHO"
          color={colors.error}
          onPress={clearCart}
        />
      </View>

      <Modalize ref={modalizeRef} adjustToContentHeight>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Forma de Pagamento</Text>
          <Text style={styles.modalText}>
            Total: R$ {formatPriceBRL(total)}
          </Text>

          <Button
            title="Crédito"
            color={colors.primary}
            onPress={() => handleConfirmPayment("CARTAO_CREDITO")}
          />

          <Button
            title="Débito"
            color={colors.sucesso}
            onPress={() => handleConfirmPayment("CARTAO_DEBITO")}
          />

          <Button
            title="Cancelar"
            color={colors.destaque}
            onPress={() => modalizeRef.current?.close()}
          />
        </View>
      </Modalize>
    </View>
  );
};

export default CarrinhoPage;
