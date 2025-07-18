import React, { useMemo, useCallback, useRef } from "react";
import { Image, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AppTheme } from "@/src/constants/colorSchemes/theme";
import styles from "./styles";
import { Title } from "@/src/components/Title";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "@/src/components/Button";
import { router } from "expo-router";
import { BombasData } from "@/src/types";
import { useLocalSearchParams } from "expo-router";
import { Modalize } from "react-native-modalize";

const CartItem = React.memo<{
  icon: React.ReactNode;
  code: string;
  title: string;
  type: string;
  price: string;
  colors: AppTheme["colors"];
  showRemoveButton?: boolean;
  onOpen: () => void;
}>(({ icon, code, title, type, price, onOpen, showRemoveButton }) => (
  <View style={styles.item}>
    <View style={styles.iconImage}>
      {icon}
      <Text style={styles.codeText}>{code}</Text>
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.pumpText}>{title}</Text>
      <View style={styles.secondLine}>
        <Text style={styles.statusText}>{type}</Text>
        <Text style={styles.statusText}>{price}</Text>
      </View>
    </View>
    {showRemoveButton && (
      <TouchableOpacity style={styles.removeButton} onPress={onOpen}>
        <MaterialCommunityIcons name="delete" size={22} color="#ff0000" />
      </TouchableOpacity>
    )}
  </View>
));

const ProductImage = React.memo<{
  colors: AppTheme["colors"];
}>(({ colors }) => (
  <Image
    source={{
      uri: "https://s1.kuantokusta.pt/img_upload/produtos_gastronomiavinhos/28413_3_coca-cola-refrigerante-com-gas-33cl.jpg",
    }}
    style={{
      width: 42,
      height: 42,
      backgroundColor: colors.fundo_escuro,
      borderRadius: 8,
      padding: 2,
    }}
    resizeMode="cover"
  />
));

const CarrinhoPage: React.FC = () => {
  const { bombasData } = useLocalSearchParams();
  const { colors } = useTheme() as AppTheme;

  const handleError = (error: Error) => {
    return (
      <View style={styles.container}>
        <View>
          <Title name="Carrinho" showBack />
        </View>
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons
            name="alert-circle"
            size={48}
            color={colors.error}
            style={{ marginBottom: 16 }}
          />
          <Text style={styles.emptyText}>{error.toString()}</Text>
        </View>
      </View>
    );
  };

  const modalizeRefOrdemPedido = useRef<Modalize>(null);
  const modalizeRefDesejaRemover = useRef<Modalize>(null);

  const parsedData = useMemo(() => {
    try {
      return JSON.parse(bombasData as string) as BombasData;
    } catch (error) {
      handleError(error as Error);
      return null;
    }
  }, [bombasData]);

  const formattedPrice = useMemo(() => {
    if (!parsedData?.price) return "R$ 0,00";
    return `R$ ${parseFloat(parsedData.price).toFixed(2)}`;
  }, [parsedData?.price]);

  const handleSugerirProdutos = useCallback(() => {
    router.replace("/produtos");
  }, []);

  const handleContinuar = useCallback(() => {
    modalizeRefOrdemPedido.current?.open();
  }, [modalizeRefOrdemPedido]);

  const handleCancelar = useCallback(() => {
    router.back();
  }, []);

  // Memoize basket icon to prevent recreation
  const basketIcon = useMemo(
    () => (
      <MaterialCommunityIcons
        name="basket"
        size={24}
        color={colors.text_white}
      />
    ),
    [colors.text_white]
  );

  if (!parsedData) {
    return handleError(new Error("Dados inválidos ou não encontrados."));
  }

  return (
    <View style={styles.container}>
      <View>
        <Title name="Carrinho" showBack />
      </View>

      <ScrollView
        contentContainerStyle={styles.itens}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
      >
        <CartItem
          icon={
            <MaterialCommunityIcons
              name="gas-station"
              size={42}
              color={colors.destaque}
              style={{
                backgroundColor: colors.fundo_escuro,
                borderRadius: 8,
                padding: 2,
              }}
            />
          }
          code={parsedData.code}
          title={`Bomba ${parsedData.id}`}
          type={parsedData.type}
          price={formattedPrice}
          colors={colors}
          onOpen={() => modalizeRefDesejaRemover.current?.open()}
        />

        <CartItem
          icon={<ProductImage colors={colors} />}
          code="023456"
          title="Refrigerante - Coca Cola"
          type="001"
          price="R$ 08,35"
          colors={colors}
          onOpen={() => modalizeRefDesejaRemover.current?.open()}
          showRemoveButton
        />
      </ScrollView>
      <Modalize ref={modalizeRefOrdemPedido}>
        <View style={styles.totalPedido}>
          <Text style={styles.titlePedido}>Ordem de Pedido</Text>
          <Button
            title="Pix"
            icon={
              <Image
                source={{
                  uri: "https://img.icons8.com/color/200/pix.png",
                }}
                style={{
                  width: 26,
                  height: 26,
                }}
              />
            }
            color="#323232"
            onPress={() => router.replace("/finalizar")}
          />
          <Button
            title="Crédito"
            color={colors.primary}
            onPress={() => router.replace("/finalizar")}
          />
          <Button
            title="Débito"
            color={colors.secundaria}
            onPress={() => router.replace("/finalizar")}
          />
          <Button
            title="Cancelar"
            color={colors.destaque}
            onPress={() => modalizeRefOrdemPedido.current?.close()}
          />
        </View>
      </Modalize>
      <Modalize ref={modalizeRefDesejaRemover}>
        <View style={styles.totalPedido}>
          <Text style={styles.titlePedido}>Deseja realmente remover?</Text>
          <CartItem
            icon={<ProductImage colors={colors} />}
            code="023456"
            title="Refrigerante - Coca Cola"
            type="001"
            price="R$ 08,35"
            colors={colors}
            onOpen={() => modalizeRefDesejaRemover.current?.open()}
          />
          <Button title="SIM" color={colors.sucesso} onPress={() => {}} />
          <Button title="NÃO" color={colors.error} onPress={() => modalizeRefDesejaRemover.current?.close()} />
        </View>
      </Modalize>

      <View style={styles.totalPedido}>
        <Text style={styles.titlePedido}>Ordem de Pedido</Text>
        <View style={styles.totalContent}>
          <Text style={styles.titlePedido}>Total</Text>
          <Text style={styles.totalNum}>R$ 56,91</Text>
        </View>

        <Button
          title="Sugerir Produtos"
          icon={basketIcon}
          color={colors.secundaria}
          onPress={handleSugerirProdutos}
        />

        <Button
          title="CONTINUAR"
          color={colors.primary}
          onPress={handleContinuar}
        />

        <Button
          title="CANCELAR"
          color={colors.destaque}
          onPress={handleCancelar}
        />
      </View>
    </View>
  );
};

export default CarrinhoPage;
