import { createGlobalTheme } from "@vanilla-extract/css";
import color from "./palettes.json";
import textStyle from "./textStyles.json";

export const theme = createGlobalTheme(":root", {
  color,
  textStyle,
});
