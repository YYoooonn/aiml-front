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
  fontFamily: themeVars.font.primary,
  borderRadius: themeVars.spacing.xsmall,
  borderColor: themeVars.color.border,
  border: globalTheme.border.bDashed,
  ...themeVars.textStyle.subtitle2,
  ":hover": {
    color: themeVars.color.textDarkest,
    backgroundColor: themeVars.color.primary,
    border: globalTheme.border.bSolid,
  },
});

export const submitButton = style([
  baseButton,
  {
    ":hover": {
      cursor: "pointer",
      color: themeVars.color.textDarkest,
      backgroundColor: themeVars.color.primary,
      border: globalTheme.border.bSolid,
      fontWeight: "600",
    },
  },
]);

export const selectedButton = style([
  baseButton,
  {
    backgroundColor: themeVars.color.primary,
    color: themeVars.color.textDarkest,
    border: globalTheme.border.bSolid,
    fontWeight: "600",
  },
]);
