import React from "react";
import { View, FlatList, Text, TouchableOpacity, Image } from "react-native";
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
  useImage?: boolean;
  imageSource?: string;
  onItemPress?: (item: Item) => void;
}

const ListaComponente: React.FC<ListaComponenteProps> = ({
  data,
  useImage = false,
  imageSource,
  onItemPress,
}) => {
  const { colors } = useTheme() as AppTheme;

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress?.(item)}>
      <View style={styles.iconImage}>
        {useImage && imageSource ? (
          <Image
            source={{ uri: imageSource }}
            style={{
              width: 42,
              height: 42,
              backgroundColor: colors.fundo_escuro,
              borderRadius: 8,
              padding: 2,
            }}
          />
        ) : (
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
        )}
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

  if (!data || data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons
          name="gas-station-off"
          size={48}
          color={colors.error}
          style={{ marginBottom: 16 }}
        />
        <Text style={styles.emptyText}>Nenhuma bomba encontrada</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      scrollEnabled={true}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ListaComponente;
