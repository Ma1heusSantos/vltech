import { AppTheme } from "@/src/constants/colorSchemes/theme";
import { useTheme } from "@react-navigation/native";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import styles from "./styles";

interface TitleProps {
  name: string;
  style?: object;
  showBack?: boolean;
}

export const Title: React.FC<TitleProps> = ({
  name,
  style,
  showBack = false,
}) => {
  const { colors } = useTheme() as AppTheme;
  const router = useRouter();

  return (
    <View style={styles.container}>
      {showBack && (
        <Text
          style={[styles.voltar, { color: colors.primary }]}
          onPress={() => router.back()}
        >
          Voltar
        </Text>
      )}
      <Text style={[styles.titulo, { color: colors.text }, style]}>{name}</Text>
    </View>
  );
};
