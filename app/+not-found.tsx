import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { AppTheme } from "@/src/constants/colorSchemes/theme";
import { Button } from "@/src/components/Button";

/**
 * O componente NotFound renderiza uma página indicando que a página solicitada não foi encontrada.
 * Ele exibe um ícone de alerta, uma mensagem e um botão para voltar à tela inicial.
 * A estilização é baseada nas cores do tema atual.
 */
export default function NotFound() {
  const router = useRouter();
  const { colors } = useTheme() as AppTheme;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Ionicons name="alert-circle-outline" size={80} color={colors.primary} />
      <Text style={[styles.title, { color: colors.second_text }]}>
        Página não encontrada
      </Text>
      <Button
        title="VOLTAR PARA TELA INICIAL"
        onPress={() => router.replace("/home")}
        color={colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
});
