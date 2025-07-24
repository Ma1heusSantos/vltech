import { StyleSheet } from "react-native";

const SPACING = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 60,
} as const;

const FONT_SIZES = {
  small: 14,
  medium: 18,
  large: 22,
} as const;

const BORDER = {
  radius: 5,
  width: 1,
  color: "#E8E8E8",
} as const;

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SPACING.lg,
    paddingHorizontal: SPACING.sm,
    paddingBottom: SPACING.md,
    alignItems: "flex-start",
  },
  detalhes: {
    width: "100%",
    marginBottom: SPACING.md,
    paddingTop: SPACING.md,
    paddingHorizontal: SPACING.md,
    gap: SPACING.xs,
    borderColor: BORDER.color,
    borderWidth: BORDER.width,
    borderRadius: BORDER.radius,
  },
  title: {
    fontSize: FONT_SIZES.large,
    fontWeight: "bold" as const,
    width: "100%",
    textAlign: "left" as const,
  },
  label: {
    fontSize: FONT_SIZES.small,
  },
  text: {
    fontSize: FONT_SIZES.medium,
    fontFamily: "RobotoMonoRegular",
    marginBottom: SPACING.md,
  },
  infos: {
    width: "100%",
    paddingVertical: SPACING.xs,
  },
});
