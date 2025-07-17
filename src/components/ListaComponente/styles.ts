import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
    borderBottomWidth: 0.8,
    borderBottomColor: "#E8E8E8",
    width: Dimensions.get("window").width - 32,
  },
  textContainer: {
    marginLeft: 10,
    maxWidth: 320,
  },
  pumpText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 3,
  },
  statusText: {
    fontSize: 16,
    color: "#000",
    fontFamily: "RobotoMonoRegular",
  },
  codeText: {
    fontSize: 14,
    color: "#000",
    fontFamily: "RobotoMonoRegular",
  },
  iconImage: {
    flexDirection: "column",
    alignItems: "center",
  },
});
