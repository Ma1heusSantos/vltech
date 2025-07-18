import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AppTheme } from "@/src/constants/colorSchemes/theme";
import styles from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Title } from "@/src/components/Title";
import { Button } from "@/src/components/Button";
import { router } from "expo-router";

const FinalizarPage: React.FC = () => {
  const { colors } = useTheme() as AppTheme;

  return (
    <View style={styles.container}>
      <View>
        <Title name="FinalizarPage" />
      </View>
      <View style={styles.detalhes}>
        <Text style={[styles.title, { color: colors.text }]}>
          Detalhes do Pedido
        </Text>
        <View style={styles.infos}>
          <Text style={[styles.label, { color: colors.second_text }]}>
            Frentista
          </Text>
          <Text style={[styles.text, { color: colors.second_text }]}>
            João Fulano
          </Text>
          <Text style={[styles.label, { color: colors.second_text }]}>
            Hora de Emissão
          </Text>
          <Text style={[styles.text, { color: colors.second_text }]}>
            08/02/2025 às 15:36
          </Text>
          <Text style={[styles.label, { color: colors.second_text }]}>
            Identificador do Terminal
          </Text>
          <Text style={[styles.text, { color: colors.second_text }]}>
            01234
          </Text>
          <Text style={[styles.label, { color: colors.second_text }]}>
            Método de Pagamento
          </Text>
          <Text style={[styles.text, { color: colors.second_text }]}>
            Visa •••• R$ 56,91
          </Text>
          <Text style={[styles.label, { color: colors.second_text }]}>
            Itens Vendidos
          </Text>
          <Text style={[styles.text, { color: colors.second_text }]}>
            1X - Abastecimento 12L - R$ 45,56
          </Text>
          <Text style={[styles.text, { color: colors.second_text }]}>
            1X - Refrigerante - R$ 8,35
          </Text>
          <Text style={[styles.label, { color: colors.second_text }]}>
            Total
          </Text>
          <Text style={[styles.text, { color: colors.second_text }]}>
            R$ 53,91
          </Text>
        </View>
      </View>
      <Button
        title="IMPRIMIR RECIBO"
        icon={
          <MaterialCommunityIcons
            name="receipt"
            size={24}
            color={colors.text_white}
          />
        }
        onPress={() => {}}
        color={colors.secundaria}
      />
      <Button title="Continuar" onPress={() => router.replace("/home")} />
    </View>
  );
};

export default FinalizarPage;
