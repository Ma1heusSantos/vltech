import React from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./styles";
import { useTheme } from "@react-navigation/native";
import { AppTheme } from "@/src/constants/colorSchemes/theme";

interface Item {
  id: string;
  type: string;
  pump: string;
  status: string;
  code: string;
}

interface ListaComponenteProps {
  data: Item[];
}

const ListaComponente: React.FC<ListaComponenteProps> = ({ data }) => {
  const { colors } = useTheme() as AppTheme;
  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity style={styles.item}>
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
        <Text style={styles.codeText}>{item.code}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.pumpText}>
          {item.pump} - {item.type}
        </Text>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ListaComponente;
