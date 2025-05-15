import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles";
import { breakpoints } from "../../styles/global";
import * as constants from "../../layout/constants";

export const headerContainer = style({
  position: "fixed",
  display: "block",
  top: "0",
  left: "0",
  alignItems: "center",
  width: "100vw",
  height: constants.HEADERHEIGHT,
  padding: "16px 32px 16px 32px",

  zIndex: 999,
  backgroundColor: themeVars.color.background,
  color: themeVars.color.text,
  "@media": {
    [breakpoints.lowTablet]: { padding: "16px 16px 16px 16px" },
  },

  ...themeVars.textStyle.subtitle1,
});

export const headerWrapper = style({
  display: "flex",
  height: "100%",
  alignItems: "center",
  justifyContent: "space-between",
});

export const logo = style({
  width: "max-content",
  height: "max-content",
  alignContent: "center",
  textDecoration: "none",
  ...themeVars.textStyle.heading4,
  ":hover": {
    cursor: "pointer",
    color: themeVars.color.primary,
  },
});

export const headerLinkWrapper = style({
  display: "flex",
  height: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  position: "relative",
});

export const headerLink = style({
  position: "relative",
  display: "block",
  alignItems: "center",
  textDecoration: "none",
  marginLeft: themeVars.spacing.medium,
});

export const pageHeader = style({
  width: "100%",
  height: "32px",
  ...themeVars.textStyle.heading4,
})