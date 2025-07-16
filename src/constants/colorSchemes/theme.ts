import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
  Theme as NavigationTheme,
} from "@react-navigation/native";

interface CustomColors {
  background: string;
  text: string;
  text_white: string;
  primary: string;
  card: string;
  border: string;
  sucesso: string;
  error: string;
  fundo_escuro: string;
  secundaria: string;
  destaque: string;
  second_text: string;
}

export interface AppTheme extends NavigationTheme {
  colors: NavigationTheme["colors"] & CustomColors;
}

export const LightTheme: AppTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    background: "#FFFFFF",
    text: "#000000",
    text_white: "#FFFFFF",
    primary: "#0077CC",
    card: "#FFFFFF",
    border: "#e0e0e0",
    sucesso: "#4CAF50",
    error: "#D32F2F",
    fundo_escuro: "#F2F2F2",
    secundaria: "#2E7D32",
    destaque: "#FF6D00",
    second_text: "#000000",
  },
};

export const DarkTheme: AppTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    background: "#FFFFFF",
    text: "#000000",
    text_white: "#FFFFFF",
    primary: "#0077CC",
    card: "#000ecfff",
    border: "#e0e0e0",
    sucesso: "#4CAF50",
    error: "#D32F2F",
    fundo_escuro: "#F2F2F2",
    secundaria: "#2E7D32",
    destaque: "#FF6D00",
    second_text: "#444444",
  },
};
