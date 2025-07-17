import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 12,
    textAlign: "center",
    alignItems: "flex-start",
    paddingBottom: 16,
  },
  detalhes: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    gap: 8,
    paddingTop: 16,
    paddingHorizontal: 16,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "left",
    width: "100%",
  },
  label: {
    fontSize: 14,
  },
  text: {
    fontSize: 18,
    fontFamily: "RobotoMonoRegular",
    marginBottom: 16,
  },
  infos: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 8,
  },
});
