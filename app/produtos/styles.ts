// src/pages/produtos/styles.ts
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // combina com o restante do app
    paddingHorizontal: 12,
    paddingTop: 8,
  },

  // Barra superior: categorias + botão carrinho
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  categoriasContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },

  categoriaBotao: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
    borderBottomWidth: 2,
  },

  categoriaTexto: {
    fontSize: 13,
    fontFamily: "Roboto-Regular",
  },

  cartButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#4B5563",
    marginLeft: 8,
  },

  cartText: {
    fontSize: 13,
    fontFamily: "Roboto-Medium",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
