import React, { useState, useMemo, useCallback } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AppTheme } from "@/src/constants/colorSchemes/theme";
import styles from "./styles";
import { Title } from "@/src/components/Title";
import ListaComponente from "@/src/components/ListaComponente";
import { router } from "expo-router";

const CATEGORIAS = ["Conveniência", "Automotivo"];

const REFRI_DATA = [
  {
    id: "1",
    type: "Coca-Cola",
    pump: "Refrigerante",
    status: "R$ 08,35",
    code: "023456",
  },
  {
    id: "2",
    type: "Coca-Cola",
    pump: "Refrigerante",
    status: "R$ 08,35",
    code: "023456",
  },
  {
    id: "3",
    type: "Coca-Cola",
    pump: "Refrigerante",
    status: "R$ 08,35",
    code: "023456",
  },
  {
    id: "4",
    type: "Coca-Cola",
    pump: "Refrigerante",
    status: "R$ 08,35",
    code: "023456",
  },
  {
    id: "5",
    type: "Coca-Cola",
    pump: "Refrigerante",
    status: "R$ 08,35",
    code: "023456",
  },
  {
    id: "6",
    type: "Coca-Cola",
    pump: "Refrigerante",
    status: "R$ 08,35",
    code: "023456",
  },
  {
    id: "7",
    type: "Coca-Cola",
    pump: "Refrigerante",
    status: "R$ 08,35",
    code: "023456",
  },
  {
    id: "8",
    type: "Coca-Cola",
    pump: "Refrigerante",
    status: "R$ 08,35",
    code: "023456",
  },
  {
    id: "9",
    type: "Coca-Cola",
    pump: "Refrigerante",
    status: "R$ 08,35",
    code: "023456",
  },
  {
    id: "10",
    type: "Coca-Cola",
    pump: "Refrigerante",
    status: "R$ 08,35",
    code: "023456",
  },
];

const SERVICOS_DATA = [
  {
    id: "1",
    type: "Troca de Óleo",
    pump: "Manutenção",
    status: "R$ 150,00",
    code: "SRV001",
  },
  {
    id: "2",
    type: "Alinhamento",
    pump: "Manutenção",
    status: "R$ 80,00",
    code: "SRV002",
  },
  {
    id: "3",
    type: "Balanceamento",
    pump: "Manutenção",
    status: "R$ 60,00",
    code: "SRV003",
  },
  {
    id: "4",
    type: "Lavagem Simples",
    pump: "Lavagem",
    status: "R$ 50,00",
    code: "SRV004",
  },
  {
    id: "5",
    type: "Lavagem Completa",
    pump: "Lavagem",
    status: "R$ 120,00",
    code: "SRV005",
  },
  {
    id: "6",
    type: "Troca de Pneus",
    pump: "Manutenção",
    status: "R$ 200,00",
    code: "SRV006",
  },
  {
    id: "7",
    type: "Polimento",
    pump: "Estética",
    status: "R$ 250,00",
    code: "SRV007",
  },
  {
    id: "8",
    type: "Higienização Interna",
    pump: "Estética",
    status: "R$ 180,00",
    code: "SRV008",
  },
  {
    id: "9",
    type: "Troca de Filtro",
    pump: "Manutenção",
    status: "R$ 90,00",
    code: "SRV009",
  },
  {
    id: "10",
    type: "Diagnóstico Eletrônico",
    pump: "Manutenção",
    status: "R$ 100,00",
    code: "SRV010",
  },
];

const IMAGE_URLS = {
  CONVENIENCIA:
    "https://s1.kuantokusta.pt/img_upload/produtos_gastronomiavinhos/28413_3_coca-cola-refrigerante-com-gas-33cl.jpg",
  AUTOMOTIVO:
    "https://images.cws.digital/produtos/gg/10/29/oleo-de-motor-essencial-alta-rodagem-1-litro-1132910-1597958587057.jpg",
};

const CategoriaButton = React.memo(
  ({
    categoria,
    isActive,
    onPress,
    colors,
  }: {
    categoria: string;
    isActive: boolean;
    onPress: () => void;
    colors: any;
  }) => (
    <TouchableOpacity
      onPress={onPress}
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
            textDecorationColor: colors.sucesso,
          },
        ]}
      >
        {categoria}
      </Text>
    </TouchableOpacity>
  )
);

const ProdutosPage: React.FC = () => {
  const { colors } = useTheme() as AppTheme;
  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState("Conveniência");
  const [isLoading, setIsLoading] = useState(false);

  const selectedData = useMemo(() => {
    return categoriaSelecionada === "Conveniência" ? REFRI_DATA : SERVICOS_DATA;
  }, [categoriaSelecionada]);

  const imageSource = useMemo(() => {
    return categoriaSelecionada === "Conveniência"
      ? IMAGE_URLS.CONVENIENCIA
      : IMAGE_URLS.AUTOMOTIVO;
  }, [categoriaSelecionada]);

  const handleCategoriaChange = useCallback(
    (categoria: string) => {
      if (categoria === categoriaSelecionada || isLoading) return;

      setIsLoading(true);
      setCategoriaSelecionada(categoria);

      // ! DELAY SIMULADO - TIRAR DPS
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    },
    [categoriaSelecionada, isLoading]
  );

  const renderCategoriaButtons = useMemo(() => {
    return CATEGORIAS.map((categoria) => {
      const isActive = categoria === categoriaSelecionada;
      return (
        <CategoriaButton
          key={categoria}
          categoria={categoria}
          isActive={isActive}
          onPress={() => handleCategoriaChange(categoria)}
          colors={colors}
        />
      );
    });
  }, [categoriaSelecionada, colors, handleCategoriaChange]);

  return (
    <View style={styles.container}>
      <Title name="Produtos" showBack />
      <View style={styles.categoriasContainer}>{renderCategoriaButtons}</View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <ListaComponente
          data={selectedData}
          useImage={true}
          imageSource={imageSource}
          onItemPress={() => router.push("/carrinho")}
        />
      )}
    </View>
  );
};

export default ProdutosPage;
