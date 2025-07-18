import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  voltar: {
    fontSize: 18,
    fontWeight: "900",
    width: 72,
    height: 32,
    alignItems: "center",
  },
  titulo: {
    position: "absolute",
    left: "50%",
    transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
});
