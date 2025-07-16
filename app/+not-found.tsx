import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { AppTheme } from "@/src/constants/colorSchemes/theme";
import { Button } from "@/src/components/Button";

export default function NotFound() {
  const router = useRouter();
  const { colors } = useTheme() as AppTheme;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
      paddingHorizontal: 12,
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      marginTop: 20,
      marginBottom: 10,
      color: colors.second_text,
    },
  });

  return (
    <View style={styles.container}>
      <Ionicons name="alert-circle-outline" size={80} color={colors.primary} />
      <Text style={styles.title}>Página Não Encontrada</Text>
      <Button
        title="VOLTAR PARA TELA INICIAL"
        onPress={() => router.replace("/home")}
        color={colors.primary}
      />
    </View>
  );
}
