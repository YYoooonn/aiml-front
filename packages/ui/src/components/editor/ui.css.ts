import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles";
import { globalTheme } from "../../styles/global";

export const selectorTitle = style({
  minWidth: "30%",
  ...themeVars.textStyle.subtitle2,
});

export const multiSelectorBlock = style({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const selectorBlock = style({
  width: "100%",
  padding: "4px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: themeVars.color.background,
});

export const multiSelectorTextInput = style({
  width: "30%",
  ...themeVars.textStyle.subtitle2,
});

export const selectorTextInput = style({
  width: "100%",
  ...themeVars.textStyle.subtitle2,
});

export const buttonSubmit = style({
  width: "100%",
  padding: "4px",
  textAlign: "center",
  border: globalTheme.border.bOutset,
  ":hover": {
    cursor: "pointer",
    color: themeVars.color.primary,
    boxShadow: "0 0 0 1px inset rgb(0,0,0)",
  },
  ...themeVars.textStyle.subtitle2,
});

export const editorHeader = style({
  width: "100%",
  // margin: "4px",
  display: "flex",
  position: "relative",
  alignItems: "center",
});

export const editorTitle = style({
  display: "flex",
  ...themeVars.textStyle.subtitle2,
});
