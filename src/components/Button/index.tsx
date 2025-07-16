import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";
import { useTheme } from "@react-navigation/native";
import { AppTheme } from "@/src/constants/colorSchemes/theme";

type ButtonProps = {
  title: string;
  onPress: () => void;
  color?: string;
  textColor?: string;
};

export const Button = ({ title, onPress, color, textColor }: ButtonProps) => {
  const { colors } = useTheme() as AppTheme;
  const backgroundColor = color
    ? colors[color as keyof typeof colors] ?? color
    : colors.primary;
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, { color: textColor ?? colors.text_white }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
