import React from "react";
import { Image, Text, View, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AppTheme } from "@/src/constants/colorSchemes/theme";
import styles from "./styles";
import { Title } from "@/src/components/Title";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "@/src/components/Button";
import { router } from "expo-router";

const Home: React.FC = () => {
  const { colors } = useTheme() as AppTheme;

  return (
    <View style={styles.container}>
      <View>
        <Title name="Carrinho" showBack />
      </View>
      <ScrollView contentContainerStyle={styles.itens}>
        <View style={styles.item}>
          <View style={styles.iconImage}>
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
            <Text style={styles.codeText}>012345</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.pumpText}>Bomba 1 - Etanol</Text>
            <View style={styles.secondLine}>
              <Text style={styles.statusText}>12L</Text>
              <Text style={styles.statusText}>R$ 45,56</Text>
            </View>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.iconImage}>
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
            />
            <Text style={styles.codeText}>023456</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.pumpText}>Refrigerante - Coca Cola</Text>
            <View style={styles.secondLine}>
              <Text style={styles.statusText}>001</Text>
              <Text style={styles.statusText}>R$ 08,35</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.totalPedido}>
        <Text style={styles.titlePedido}>Ordem de Pedido</Text>
        <View style={styles.totalContent}>
          <Text style={styles.titlePedido}>Total</Text>
          <Text style={styles.totalNum}>R$ 56,91</Text>
        </View>
        <Button
          title="Sugerir Produtos"
          icon={
            <MaterialCommunityIcons
              name="basket"
              size={24}
              color={colors.text_white}
            />
          }
          color={colors.secundaria}
          onPress={() => router.replace("/produtos")}
        />
        <Button
          title="CONTINUAR"
          color={colors.primary}
          onPress={() => router.push("/metodoPagamento")}
        />
        <Button title="CANCELAR" color={colors.destaque} onPress={() => router.back()} />
      </View>
    </View>
  );
};

export default Home;
