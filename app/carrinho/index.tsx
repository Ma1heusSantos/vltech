import React, { useMemo, useCallback, useRef, useState } from "react";
import { Image, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { Modalize } from "react-native-modalize";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { AppTheme } from "@/src/constants/colorSchemes/theme";
import { Title } from "@/src/components/Title";
import { Button } from "@/src/components/Button";
import { BombasData } from "@/src/types";
import styles from "./styles";

interface CartItemData {
  id: string;
  icon: React.ReactNode;
  code: string;
  title: string;
  type: string;
  price: string;
  showRemoveButton?: boolean;
}

interface CartItemProps extends CartItemData {
  colors: AppTheme["colors"];
  onRemove: (id: string) => void;
}

interface ProductImageProps {
  colors: AppTheme["colors"];
  uri?: string;
}

interface PaymentMethod {
  id: string;
  title: string;
  color: string;
  icon?: React.ReactNode;
}

const DEFAULT_PRODUCT_IMAGE =
  "https://s1.kuantokusta.pt/img_upload/produtos_gastronomiavinhos/28413_3_coca-cola-refrigerante-com-gas-33cl.jpg";
const PIX_ICON_URL = "https://img.icons8.com/color/200/pix.png";

const CartItem = React.memo<CartItemProps>(
  ({
    id,
    icon,
    code,
    title,
    type,
    price,
    showRemoveButton = false,
    onRemove,
  }) => (
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
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => onRemove(id)}
          accessibilityLabel={`Remove ${title}`}
          accessibilityRole="button"
        >
          <MaterialCommunityIcons name="delete" size={22} color="#ff0000" />
        </TouchableOpacity>
      )}
    </View>
  )
);

const ProductImage = React.memo<ProductImageProps>(
  ({ colors, uri = DEFAULT_PRODUCT_IMAGE }) => (
    <Image
      source={{ uri }}
      style={[styles.productImage, { backgroundColor: colors.fundo_escuro }]}
      resizeMode="cover"
    />
  )
);

const ErrorView: React.FC<{ colors: AppTheme["colors"]; message: string }> =
  React.memo(({ colors, message }) => (
    <View style={styles.container}>
      <Title name="Carrinho" showBack />
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons
          name="alert-circle"
          size={48}
          color={colors.error}
          style={{ marginBottom: 16 }}
        />
        <Text style={styles.emptyText}>{message}</Text>
      </View>
    </View>
  ));

const useCartData = (bombasDataParam: string | string[] | undefined) => {
  return useMemo(() => {
    if (!bombasDataParam || typeof bombasDataParam !== "string") {
      return { data: null, error: "Dados não fornecidos." };
    }

    try {
      const parsed = JSON.parse(bombasDataParam) as BombasData;
      return { data: parsed, error: null };
    } catch (error) {
      return { data: null, error: "Dados inválidos ou corrompidos." };
    }
  }, [bombasDataParam]);
};

const usePaymentMethods = (colors: AppTheme["colors"]): PaymentMethod[] => {
  return useMemo(
    () => [
      {
        id: "pix",
        title: "Pix",
        color: "#323232",
        icon: (
          <Image source={{ uri: PIX_ICON_URL }} style={styles.paymentIcon} />
        ),
      },
      { id: "credit", title: "Crédito", color: colors.primary },
      { id: "debit", title: "Débito", color: colors.secundaria },
    ],
    [colors.primary, colors.secundaria]
  );
};

const CarrinhoPage: React.FC = () => {
  const { bombasData } = useLocalSearchParams();
  const { colors } = useTheme() as AppTheme;

  const [cartItems, setCartItems] = useState<CartItemData[]>([]);

  const modalizeRefOrdemPedido = useRef<Modalize>(null);
  const modalizeRefDesejaRemover = useRef<Modalize>(null);
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);

  const { data: parsedData, error } = useCartData(bombasData);
  const paymentMethods = usePaymentMethods(colors);

  const formattedPrice = useMemo(() => {
    if (!parsedData?.price) return "R$ 0,00";
    const price = parseFloat(parsedData.price);
    return `R$ ${price.toFixed(2).replace(".", ",")}`;
  }, [parsedData?.price]);

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

  const gasStationIcon = useMemo(
    () => (
      <MaterialCommunityIcons
        name="gas-station"
        size={42}
        color={colors.destaque}
        style={[
          styles.gasStationIcon,
          { backgroundColor: colors.fundo_escuro },
        ]}
      />
    ),
    [colors.destaque, colors.fundo_escuro]
  );

  const initialCartItems = useMemo(() => {
    if (!parsedData) return [];

    const items: CartItemData[] = [
      {
        id: "gas-station",
        icon: gasStationIcon,
        code: parsedData.code,
        title: `Bomba ${parsedData.id}`,
        type: parsedData.type,
        price: formattedPrice,
        showRemoveButton: false,
      },
      {
        id: "coca-cola",
        icon: <ProductImage colors={colors} />,
        code: "023456",
        title: "Refrigerante - Coca Cola",
        type: "001",
        price: "R$ 08,35",
        showRemoveButton: true,
      },
    ];

    return items;
  }, [parsedData, gasStationIcon, formattedPrice, colors]);

  React.useEffect(() => {
    setCartItems(initialCartItems);
  }, [initialCartItems]);

  const handleSugerirProdutos = useCallback(() => {
    router.replace("/produtos");
  }, []);

  const handleContinuar = useCallback(() => {
    modalizeRefOrdemPedido.current?.open();
  }, []);

  const handleCancelar = useCallback(() => {
    router.back();
  }, []);

  const handlePaymentSelect = useCallback((paymentId: string) => {
    modalizeRefOrdemPedido.current?.close();
    router.replace("/finalizar");
  }, []);

  const handleRemoveItem = useCallback((itemId: string) => {
    setItemToRemove(itemId);
    modalizeRefDesejaRemover.current?.open();
  }, []);

  const confirmRemoveItem = useCallback(() => {
    if (itemToRemove) {
      setCartItems((prev) => prev.filter((item) => item.id !== itemToRemove));
      setItemToRemove(null);
    }
    modalizeRefDesejaRemover.current?.close();
  }, [itemToRemove]);

  const cancelRemoveItem = useCallback(() => {
    setItemToRemove(null);
    modalizeRefDesejaRemover.current?.close();
  }, []);

  const totalPrice = useMemo(() => {
    return "R$ 56,91";
  }, [cartItems]);

  if (error) {
    return <ErrorView colors={colors} message={error} />;
  }

  if (!parsedData) {
    return <ErrorView colors={colors} message="Dados não encontrados." />;
  }

  const itemToRemoveData = cartItems.find((item) => item.id === itemToRemove);

  return (
    <View style={styles.container}>
      <Title name="Carrinho" showBack />

      <ScrollView
        contentContainerStyle={styles.itens}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
      >
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            {...item}
            colors={colors}
            onRemove={handleRemoveItem}
          />
        ))}
      </ScrollView>

      <Modalize ref={modalizeRefOrdemPedido} adjustToContentHeight>
        <View style={styles.modalContent}>
          <Text style={styles.titlePedido}>Ordem de Pedido</Text>
          {paymentMethods.map((method) => (
            <Button
              key={method.id}
              title={method.title}
              icon={method.icon}
              color={method.color}
              onPress={() => handlePaymentSelect(method.id)}
            />
          ))}
          <Button
            title="Cancelar"
            color={colors.destaque}
            onPress={() => modalizeRefOrdemPedido.current?.close()}
          />
        </View>
      </Modalize>

      <Modalize ref={modalizeRefDesejaRemover} adjustToContentHeight>
        <View style={styles.modalContent}>
          <Text style={styles.titlePedido}>Deseja realmente remover?</Text>
          {itemToRemoveData && (
            <CartItem
              {...itemToRemoveData}
              colors={colors}
              onRemove={() => {}}
              showRemoveButton={false}
            />
          )}
          <Button
            title="SIM"
            color={colors.sucesso}
            onPress={confirmRemoveItem}
          />
          <Button title="NÃO" color={colors.error} onPress={cancelRemoveItem} />
        </View>
      </Modalize>

      <View style={styles.totalPedido}>
        <Text style={styles.titlePedido}>Ordem de Pedido</Text>
        <View style={styles.totalContent}>
          <Text style={styles.titlePedido}>Total</Text>
          <Text style={styles.totalNum}>{totalPrice}</Text>
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
