import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles";
import { globalTheme } from "../../styles/global";
import { moduleContainer } from "./module.css";

export const layerContainer = moduleContainer;

export const infoTag = style({
  ...themeVars.textStyle.subtitle2,
  padding: "4px",
  color: themeVars.color.text,
});

export const layerTag = style([
  infoTag,
  {
    userSelect: "none",
    ":hover": {
      cursor: "pointer",
      color: themeVars.color.primary,
    },
  },
]);

export const layerTagSelected = style([
  layerTag,
  {
    fontWeight: "700",
    color: themeVars.color.primary,
  },
]);

export const sceneTagSelected = style([
  layerTag,
  {
    fontWeight: "700",
    color: themeVars.color.text,
  },
]);

export const tableBlock = style({
  // display: "static",
  flexDirection: "column",
  // gap: "4px",
  padding: "0.2rem",
  border: globalTheme.border.bSolid,
  // borderRadius: "8px",
  // boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.1)",
  // width: "100%",
  marginTop: "8px",
});

export const tableBlockTitle = style({
  // backgroundColor: themeVars.color.backgroundDark,
  borderBottom: globalTheme.border.bSolid,
  marginTop: "0.4rem",
  marginBottom: "0.4rem",
});

export const tableBlockContent = style({
  ...themeVars.textStyle.subtitle2,

  // borderBottom: globalTheme.border.bDotted,
  margin: "0.4rem",
});

export const participantTag = style({
  ...themeVars.textStyle.subtitle2,
  padding: "0.2rem",
  width: "max-content",
  height: "max-content",
});

export const participantContainer = style({
  // padding: "0.2rem",
  margin: "0.2rem",
  border: globalTheme.border.bSolid,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  ":hover": {
    // cursor: "pointer",
    backgroundColor: "rgba(255, 123, 0, 0.5)",
  },
});

export const participantContainerSelected = style([
  participantContainer,
  {
    fontWeight: "700",
    backgroundColor: "rgba(255, 123, 0, 0.5)",
  },
]);

export const roleButtonContainer = style({
  display: "flex",
  width: "max-content",
  height: "max-content",
  position: "relative",
  justifyContent: "space-between",
  alignItems: "center",
});

export const roleButton = style({
  ...themeVars.textStyle.subtitle3,
  margin: "0.2rem",
  alignContent: "center",
  textAlign: "center",
  alignItems: "center",
  width: "32px",
  height: "32px",
  border: globalTheme.border.bSolid,
  ":hover": {
    cursor: "pointer",
    backgroundColor: themeVars.color.secondary,
    color: themeVars.color.textLightest,
  },
});

export const roleButtonPreSelected = style([
  roleButton,
  {
    backgroundColor: "rgba(27, 64, 253, 0.5)",
  },
]);

export const roleButtonSelected = style([
  roleButton,
  {
    backgroundColor: themeVars.color.secondary,
    color: themeVars.color.textLightest,
  },
]);

export const roleButtonDelete = style([
  roleButton,
  {
    backgroundColor: "rgba(255, 123, 0, 0.5)",
    ":hover": {
      cursor: "pointer",
      backgroundColor: "red",
      color: themeVars.color.textLightest,
      fontWeight: "700",
    },
  },
]);

export const roleButtonDisabled = style([
  roleButton,
  {
    backgroundColor: globalTheme.palette.gray400,
    color: themeVars.color.textLight,
    border: globalTheme.border.bDashed,
    cursor: "not-allowed",
    ":hover": {
      cursor: "not-allowed",
      color: themeVars.color.textLight,
      backgroundColor: globalTheme.palette.gray400,
    },
  },
]);

export const roleAddButtonSelectable = style([
  roleButton,
  {
    fontWeight: "700",
    borderWidth: "1.5px",
    ":hover": {
      cursor: "pointer",
      backgroundColor: themeVars.color.tertiary,
    },
  },
]);
