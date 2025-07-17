import { Dimensions, StyleSheet } from "react-native";
const { width: screenWidth } = Dimensions.get("window");

export default StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E8E8E8",
    width: screenWidth - 32,
  },

  textContainer: {
    flex: 1,
    marginLeft: 10,
    maxWidth: screenWidth - 100,
  },

  pumpText: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 3,
    color: "#000",
  },

  statusText: {
    fontSize: 16,
    color: "#000",
    fontFamily: "RobotoMonoRegular",
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
});
