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
      {
        borderBottomColor: isActive ? colors.text : "transparent",
      },
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
      if (category === selectedCategory || isLoading) return;

      setIsLoading(true);
      setSelectedCategory(category);

      setTimeout(() => setIsLoading(false), 300);
    },
    [selectedCategory, isLoading]
  );

  /** ⚡ Enviando item para o carrinho */
  const handleItemPress = useCallback((item: ProductItem) => {
    router.push({
      pathname: "/carrinho",
      params: {
        bombasData: JSON.stringify(item),
      },
    });
  }, []);

  return (
    <View style={styles.container}>
      <Title name="Produtos" showBack />

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
