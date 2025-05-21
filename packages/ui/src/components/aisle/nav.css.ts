import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles";
import { globalTheme } from "../../styles/global";

const baseAisleBlock = style({
  display: "flex",
  alignContent: "center",
  alignItems: "center",
  height: "24px",
  ":hover": {
    cursor: "pointer",
    color: themeVars.color.primary,
  },
});

export const leftAisleBlock = style([baseAisleBlock]);

export const leftAisleIcon = style({
  width: "16px",
  height: "16px",
  marginRight: "2px",
  marginLeft: "4px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

export const leftAisleText = style({
  position: "relative",
  display: "block",
  alignItems: "center",
  ...themeVars.textStyle.subtitle1,
  fontWeight: "500",
});

export const dropdownContainer = style({
  display: "block",
  marginLeft: "16px",
});

export const dropdownSelector = style({
  width: "100%",
  paddingBottom: "4px",
  ...themeVars.textStyle.subtitle2,
  ":hover": {
    cursor: "pointer",
    color: themeVars.color.primary,
  },
});
