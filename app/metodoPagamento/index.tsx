import React from "react";
import { View, Text, Image } from "react-native";
import { Button } from "@/src/components/Button";
import styles from "./styles";
import { useTheme } from "@react-navigation/native";
import { AppTheme } from "@/src/constants/colorSchemes/theme";
import { Title } from "@/src/components/Title";
import { router } from "expo-router";

const MetodoPagamento = () => {
  const { colors } = useTheme() as AppTheme;
  return (
    <View style={styles.container}>
      <Title name="Método de Pagamento" showBack />
      <View style={styles.totalPedido}>
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
          onPress={() => router.back()}
        />
      </View>
    </View>
  );
};

export default MetodoPagamento;
