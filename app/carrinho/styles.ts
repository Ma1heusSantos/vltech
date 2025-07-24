import { Dimensions, StyleSheet } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 32,
  xxxl: 48,
  large: 64,
};

const BORDER_RADIUS = {
  sm: 5,
  md: 8,
};

const FONT_SIZES = {
  sm: 14,
  md: 16,
  lg: 20,
  xl: 22,
  xxl: 24,
};

const COLORS = {
  border: "#E8E8E8",
  text: "#000",
  textSecondary: "#666",
  error: "#ff0000",
};

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: SPACING.md,
    alignItems: "flex-start",
  },

  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: SPACING.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
    width: screenWidth - SPACING.xxl,
    position: "relative",
  },

  removeButton: {
    position: "absolute",
    right: SPACING.sm,
    top: SPACING.sm,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    opacity: 1,
  },

  iconImage: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 50,
  },

  textContainer: {
    flex: 1,
    marginLeft: 10,
    maxWidth: screenWidth - 100,
    padding: 7,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.sm,
  },

  pumpText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "400",
    marginBottom: 3,
    color: COLORS.text,
    flexShrink: 1,
  },

  statusText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    fontFamily: "RobotoMonoMedium",
  },

  codeText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontFamily: "RobotoMonoRegular",
    marginTop: SPACING.xs,
  },

  secondLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  productImage: {
    width: 42,
    height: 42,
    borderRadius: BORDER_RADIUS.md,
    padding: 2,
  },

  gasStationIcon: {
    borderRadius: BORDER_RADIUS.md,
    padding: 2,
  },

  paymentIcon: {
    width: 26,
    height: 26,
  },

  itens: {
    width: "100%",
    paddingBottom: SPACING.xl,
    justifyContent: "flex-start",
    flexGrow: 1,
  },

  totalPedido: {
    width: "100%",
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.sm,
    marginTop: SPACING.xl,
    alignItems: "center",
    marginBottom: SPACING.xxl,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: "transparent",
  },

  titlePedido: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: "600",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: SPACING.sm,
  },

  totalContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: SPACING.md,
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.sm,
  },

  totalNum: {
    fontSize: FONT_SIZES.xxl,
    color: COLORS.text,
    fontFamily: "RobotoMonoMedium",
    fontWeight: "bold",
  },

  modalContent: {
    width: "100%",
    padding: SPACING.lg,
    alignItems: "center",
    paddingBottom: SPACING.xxl,
  },

  emptyContainer: {
    flex: 1,
    width: "100%",
    paddingTop: SPACING.large,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontSize: FONT_SIZES.xl,
    color: COLORS.text,
    textAlign: "center",
    paddingHorizontal: SPACING.lg,
    lineHeight: FONT_SIZES.xl * 1.5,
  },

  accessibilityFocused: {
    borderWidth: 2,
    borderColor: "#007AFF",
  },
});
