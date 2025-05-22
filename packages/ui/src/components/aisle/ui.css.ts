import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles";
import { globalTheme } from "../../styles/global";

export const selectionHeaderContainer = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
});

export const aisleTopHeader = style({
  width: "100%",
  // margin: "4px",
  display: "flex",
  position: "relative",
  alignItems: "center",
});

const icon = style({
  width: "16px",
  height: "16px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "100px",
  ":hover": {
    cursor: "pointer",
  },
});

export const returnIcon = style([
  icon,
  {
    marginRight: "4px",
  },
]);

export const editIcon = style([
  icon,
  {
    marginLeft: "auto",
    marginRight: "4px",
  },
]);

export const projectTitle = style({
  display: "flex",
  ...themeVars.textStyle.subtitle1,
});

export const baseTag = style({
  width: "100%",
  height: "24px",
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

export const selectedTag = style([
  baseTag,
  {
    backgroundColor: themeVars.color.primary,
    color: themeVars.color.textDarkest,
    border: globalTheme.border.bSolid,
    fontWeight: "600",
  },
]);
