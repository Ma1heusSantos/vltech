import React, { useState, useMemo, useCallback } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";

import { AppTheme } from "@/src/constants/colorSchemes/theme";
import { Title } from "@/src/components/Title";
import ListaComponente from "@/src/components/ListaComponente";
import styles from "./styles";

import { PRODUCT_DATA, CATEGORY_CONFIG } from "../../src/constants/constants";
import type { CategoryType, ProductItem } from "../../src/types/index";

// -----------------------------
// 🔥 Função para converter "R$ 07,90" → 7.9
// -----------------------------
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

// -----------------------------
// 🔥 Botão de categoria (memoizado)
// -----------------------------
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

// -----------------------------
// 🔥 Tela principal
// -----------------------------
const ProdutosPage: React.FC = () => {
  const { colors } = useTheme() as AppTheme;

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>("Conveniência");
  const [isLoading, setIsLoading] = useState(false);

  // ----------------------------------------------------
  // 🔥 Carregar produtos da categoria selecionada
  // ----------------------------------------------------
  const { data, imageSource } = useMemo(() => {
    const config = CATEGORY_CONFIG[selectedCategory];
    return {
      data: PRODUCT_DATA[config.dataKey],
      imageSource: config.imageUrl,
    };
  }, [selectedCategory]);

  // ----------------------------------------------------
  // 🔥 Trocar categoria
  // ----------------------------------------------------
  const handleCategoryChange = useCallback(
    (category: CategoryType) => {
      if (isLoading || category === selectedCategory) return;

      setIsLoading(true);
      setSelectedCategory(category);

      setTimeout(() => setIsLoading(false), 300);
    },
    [selectedCategory, isLoading]
  );

  // ----------------------------------------------------
  // 🔥 Enviar item para o carrinho
  // ----------------------------------------------------
  const handleItemPress = useCallback((item: ProductItem) => {
    const price = parsePrice(item.status);

    router.push({
      pathname: "/carrinho",
      params: {
        bombasData: JSON.stringify({
          id: item.id,
          title: item.type,
          price: price, // agora valor numérico
          code: item.code,
        }),
      },
    });
  }, []);

  return (
    <View style={styles.container}>
      <Title name="Produtos" showBack />

      {/* 🔥 Categorias */}
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

      {/* 🔥 Lista ou carregamento */}
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
