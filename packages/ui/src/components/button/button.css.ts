import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles/theme";
import { globalTheme } from "../../styles/global";

export const baseButton = style({
  width: "100%",
  height: "100%",
  alignContent: "center",
  textAlign: "center",
  cursor: "pointer",
  color: themeVars.color.text,
  // borderRadius: themeVars.spacing.xsmall,
  border: globalTheme.border.bSolid,
  borderColor: themeVars.color.borderLight,
  backgroundColor: themeVars.color.background,
  ...themeVars.textStyle.subtitle2,
  ":hover": {
    color: themeVars.color.textDarkest,
    backgroundColor: themeVars.color.primary,
    borderColor: themeVars.color.borderDark,
    border: globalTheme.border.bSolid,
    fontWeight: "600",
  },
});

export const submitButton = style([
  baseButton,
  {
    ":hover": {
      cursor: "pointer",
      backgroundColor: themeVars.color.primary,
      border: globalTheme.border.bSolid,
    },
  },
]);

export const selectorButton = style([
  baseButton,
  {
    ":hover": {
      backgroundColor: themeVars.color.tertiary,
    },
  },
]);

export const selectedButton = style([
  selectorButton,
  {
    backgroundColor: themeVars.color.tertiary,
    color: themeVars.color.textDarkest,
    border: globalTheme.border.bSolid,
    fontWeight: "600",
  },
]);
