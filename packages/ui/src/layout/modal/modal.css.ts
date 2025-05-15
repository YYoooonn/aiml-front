import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles";
import { globalTheme, breakpoints } from "../../styles/global";

export const overlay = style({
  position: "fixed",
  display: "flex",
  overflowY: "auto",
  width: "100vw",
  height: "100vh",
  top: 0,
  left: 0,
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
  backgroundColor: "rgba(0, 0, 0, 0.2)",
});

export const modalWrapper = style({
  position: "relative",
  width: "90vw",
  maxWidth: "1400px",
  height: "90vh",
  zIndex: 1001,
  backgroundColor: themeVars.color.background,
  marginTop: themeVars.spacing.medium,
  "@media": {
    [breakpoints.lowTablet]: {
      width: "100vw",
      height: "100vh",
      marginTop: 0,
      border: "none",
    },
  },
});

export const modalInWrapper = style({
  width: "100%",
  height: "100%",
  padding: "12px",
  display: "flex",
  flexDirection: "column",
  border: globalTheme.border.bSolid,
  borderColor: themeVars.color.border,
  ...themeVars.textStyle.subtitle2,
});

export const modalContent = style({
  paddingTop: globalTheme.spacing.s8,
  flex: 1,
});

export const modalHeader = style({
  width: "100%",
});

export const modalHeaderTitle = style({
  display: "block",
  color: themeVars.color.text,
  ...themeVars.textStyle.heading4,
});

export const modalHeaderSubtitle = style({
  display: "block",
  color: themeVars.color.text,
  ...themeVars.textStyle.subtitle1,
});

export const buttonExit = style({
  display: "flex",
  float: "right",
  height: "16px",
  width: "16px",
  marginLeft: "auto",
  marginRight: 0,
  backgroundColor: themeVars.color.primary,
  border: globalTheme.border.bSolid,
  borderColor: themeVars.color.border,
  ":hover": {
    cursor: "pointer",
  },
});
