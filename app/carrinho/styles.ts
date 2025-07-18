import { Dimensions, StyleSheet } from "react-native";
const { width: screenWidth } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 12,
    textAlign: "center",
    alignItems: "flex-start",
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E8E8E8",
    width: screenWidth - 32,
    position: "relative", // Added to support absolute positioning of remove button
  },
  removeButton: {
    position: "absolute",
    right: 8,
    top: 8,
    padding: 14,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    maxWidth: screenWidth - 100,
    padding: 7,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 5,
  },
  pumpText: {
    fontSize: 20,
    fontWeight: "400",
    marginBottom: 3,
    color: "#000",
  },
  statusText: {
    fontSize: 16,
    color: "#000",
    fontFamily: "RobotoMonoMedium",
  },
  codeText: {
    fontSize: 14,
    color: "#666",
    fontFamily: "RobotoMonoRegular",
  },
  iconImage: {
    alignItems: "center",
    justifyContent: "center",
  },
  itens: {
    width: "100%",
    paddingBottom: 20,
    justifyContent: "flex-start",
  },
  secondLine: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalPedido: {
    width: "100%",
    padding: 16,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
    marginBottom: 32,
    borderTopWidth: 1,
    borderTopColor: "#E8E8E8",
  },
  titlePedido: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
  },
  totalContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 12,
    marginBottom: 12,
  },
  totalNum: {
    fontSize: 24,
    color: "#000",
    textAlign: "center",
    fontFamily: "RobotoMonoMedium",
  },
  emptyContainer: {
    width: "100%",
    paddingTop: 64,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 22,
    color: "#000",
    textAlign: "center",
  },
});
