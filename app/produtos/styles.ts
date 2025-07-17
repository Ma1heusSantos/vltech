import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 12,
    alignItems: "flex-start",
    paddingBottom: 16,
  },
  categoriasContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
    gap: 24,
    paddingVertical: 16,
  },
  categoriaBotao: {
    paddingHorizontal: 24,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  categoriaTexto: {
    fontSize: 20,
  },
  loadingContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20%",
  },
});
