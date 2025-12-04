// app/produtos.tsx
import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";

import { AppTheme } from "@/src/constants/colorSchemes/theme";
import { Title } from "@/src/components/Title";
import ListaComponente from "@/src/components/ListaComponente";
import styles from "./styles";

import { PRODUCT_DATA, CATEGORY_CONFIG } from "@/src/constants/constants";
import type { CategoryType, ProductItem } from "@/src/types";
import { useCart } from "@/src/context/CartContext";

// Converte "R$ 7,90" → 7.9
function parsePrice(status: string): number {
  if (!status) return 0;
  return Number(
    status
      .replace("R$", "")
      .replace(/\s/g, "")
      .replace(".", "")
      .replace(",", ".")
      .trim()
  );
}

const CategoryButton = React.memo<{
  category: CategoryType;
  isActive: boolean;
  onPress: (category: CategoryType) => void;
  colors: AppTheme["colors"];
}>(({ category, isActive, onPress, colors }) => (
  <TouchableOpacity
    onPress={() => onPress(category)}
    style={[
      styles.categoriaBotao,
      { borderBottomColor: isActive ? colors.text : "transparent" },
    ]}
  >
    <Text
      style={[
        styles.categoriaTexto,
        {
          color: isActive ? colors.sucesso : colors.text,
          fontWeight: isActive ? "600" : "normal",
        },
      ]}
    >
      {category}
    </Text>
  </TouchableOpacity>
));

CategoryButton.displayName = "CategoryButton";

const ProdutosPage: React.FC = () => {
  const { colors } = useTheme() as AppTheme;
  const { addItem, items } = useCart();

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>("Conveniência");
  const [isLoading, setIsLoading] = useState(false);

  const { data, imageSource } = useMemo(() => {
    const config = CATEGORY_CONFIG[selectedCategory];
    return {
      data: PRODUCT_DATA[config.dataKey],
      imageSource: config.imageUrl,
    };
  }, [selectedCategory]);

  const handleCategoryChange = useCallback(
    (category: CategoryType) => {
      if (isLoading || category === selectedCategory) return;

      setIsLoading(true);
      setSelectedCategory(category);
      setTimeout(() => setIsLoading(false), 200);
    },
    [selectedCategory, isLoading]
  );

  const handleItemPress = useCallback(
    (item: ProductItem) => {
      const price = parsePrice(item.status);

      addItem({
        id: String(item.id),
        name: item.type,
        price,
        code: item.code,
      });

      Alert.alert("Adicionado", `${item.type} foi adicionado ao carrinho.`, [
        { text: "Continuar comprando" },
        {
          text: "Ir para o carrinho",
          onPress: () => router.push("/carrinho"),
        },
      ]);
    },
    [addItem]
  );

  const totalItens = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  return (
    <View style={styles.container}>
      <Title name="Produtos" showBack />

      {/* Barra topo: categorias + carrinho */}
      <View style={styles.topBar}>
        <View style={styles.categoriasContainer}>
          {Object.keys(CATEGORY_CONFIG).map((category) => {
            const categoryKey = category as CategoryType;
            return (
              <CategoryButton
                key={categoryKey}
                category={categoryKey}
                isActive={categoryKey === selectedCategory}
                onPress={handleCategoryChange}
                colors={colors}
              />
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => router.push("/carrinho")}
        >
          <Text style={[styles.cartText, { color: colors.text }]}>
            Carrinho ({totalItens})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <ListaComponente
          data={data}
          useImage={true}
          imageSource={imageSource}
          onItemPress={handleItemPress}
        />
      )}
    </View>
  );
};

export default ProdutosPage;
