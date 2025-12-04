// src/pages/carrinho/styles.ts
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingTop: 8,
  },

  listContainer: {
    paddingBottom: 16,
  },

  // Quando o carrinho está vazio
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  emptyText: {
    fontSize: 14,
    color: "#E5E7EB",
    marginBottom: 16,
    textAlign: "center",
    fontFamily: "Roboto-Regular",
  },

  // Linha de item
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: "#eee",
    marginBottom: 6,
  },

  itemTitle: {
    fontSize: 14,
    color: "#0B1120",
    fontFamily: "Roboto-Medium",
    marginBottom: 2,
  },

  itemPrice: {
    fontSize: 12,
    color: "#0B1120",
    fontFamily: "Roboto-Regular",
  },

  itemSubtotal: {
    fontSize: 12,
    color: "#22C55E",
    fontFamily: "Roboto-Medium",
  },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
  },

  qtyButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4B5563",
  },

  qtyButtonText: {
    fontSize: 16,
    color: "#0B1120",
    fontFamily: "Roboto-Medium",
  },

  qtyText: {
    width: 24,
    textAlign: "center",
    fontSize: 14,
    color: "#0B1120",
    fontFamily: "Roboto-Medium",
    marginHorizontal: 4,
  },

  removeButton: {
    paddingHorizontal: 6,
    paddingVertical: 4,
  },

  removeText: {
    fontSize: 14,
    color: "#F97373",
    fontFamily: "Roboto-Bold",
  },

  // Rodapé com total e botões
  footer: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: "#fff",
    backgroundColor: "#fff",
  },

  totalLabel: {
    fontSize: 14,
    color: "#0B1120",
    fontFamily: "Roboto-Regular",
  },

  totalValue: {
    fontSize: 18,
    color: "#22C55E",
    fontFamily: "Roboto-Bold",
    marginBottom: 8,
  },

  // Modal de pagamento
  modalContent: {
    padding: 16,
    backgroundColor: "#020617",
  },

  modalTitle: {
    fontSize: 16,
    color: "#F9FAFB",
    fontFamily: "Roboto-Bold",
    marginBottom: 8,
  },

  modalText: {
    fontSize: 14,
    color: "#E5E7EB",
    fontFamily: "Roboto-Regular",
    marginBottom: 16,
  },
});

export default styles;
