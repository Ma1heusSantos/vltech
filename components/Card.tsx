import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Bico } from "../types/bicos";

interface CardProps {
  bico: Bico;
  onPress: (bico: Bico) => void;
}

const Card: React.FC<CardProps> = ({ bico, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(bico)}>
      <Text style={styles.title}>{bico.nome}</Text>
      <Text style={styles.status}>Status: {bico.status}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 8,
    padding: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  status: {
    marginTop: 8,
    color: "#6b7280",
  },
});

export default Card;
