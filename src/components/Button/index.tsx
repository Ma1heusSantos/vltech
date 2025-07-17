import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";
import styles from "./styles";
import { useTheme } from "@react-navigation/native";
import { AppTheme } from "@/src/constants/colorSchemes/theme";

type ButtonProps = {
  title: string;
  onPress: () => void;
  color?: string;
  textColor?: string;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

/**
 * Um componente de botão personalizável para React Native.
 *
 * @param {Object} props - As propriedades para o componente Button.
 * @param {string} props.title - O texto exibido dentro do botão.
 * @param {() => void} props.onPress - Função de callback para lidar com eventos de pressionamento do botão.
 * @param {string} [props.color] - Cor de fundo opcional para o botão. Pode ser uma chave de cor do tema ou uma string de cor personalizada.
 * @param {string} [props.textColor] - Cor opcional para o texto do botão.
 * @param {React.ReactNode} [props.icon] - Ícone opcional exibido à esquerda do texto do botão.
 * @param {StyleProp<ViewStyle>} [props.style] - Estilos adicionais para o botão.
 *
 * @returns O componente de botão renderizado.
 */
export const Button = ({
  title,
  onPress,
  color,
  textColor,
  icon,
  style, // Inclui o style nas props desestruturadas
}: ButtonProps) => {
  const { colors } = useTheme() as AppTheme;
  const backgroundColor = color
    ? colors[color as keyof typeof colors] ?? color
    : colors.primary;
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }, style]} // Aplica o style passado como prop
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon && <View style={{ marginRight: 8 }}>{icon}</View>}
        <Text style={[styles.text, { color: textColor ?? colors.text_white }]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
