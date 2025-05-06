import { style } from "@vanilla-extract/css";
import { theme } from "@/styles/theme.css";
import { breakpoints } from "@/styles/breakpoints";
import * as constants from "@/styles/constants";
import { baseBorder } from "./aisle.css";
import { themeVars } from "@repo/ui/styles";

const aisleContainer = {
  display: "flex",
  // color: "black",
  width: constants.AISLEWIDTH,
  height: `calc(100vh - ${constants.HNFHEIGHT})`,
  alignSelf: "top",
  zIndex: 9999,
  "@media": {
    [breakpoints.lowTablet]: { display: "none" },
  },
  ...themeVars.textStyle.small,
};

export const leftAisleContainer = style({
  overflow: "hidden",
  position: "fixed",
  // top: constants.HEADERHEIGHT,
  // minHeight: "calc(100% - 16px)",
  flexDirection: "column",
  float: "left",

  left: 0,
  marginLeft: "32px",

  ...aisleContainer,
});

export const rightAisleContainer = style({
  overflowX: "hidden",
  position: "fixed",

  flexDirection: "column",
  float: "right",

  right: 0,
  marginRight: "32px",

  border: "1px solid",

  ...aisleContainer,
});

export const aisleInnerWrapper = style({
  display: "block",
  width: "100%",
  height: "100%",
  padding: "14px",
  ...baseBorder,
  backgroundColor: themeVars.color.background,
  color: themeVars.color.text,
});

export const baseAisleBlock = {
  display: "flex",
  alignItems: "center",
  marginBottom: "8px",
  height: "24px",
};

export const leftAisleBlock = style({
  ...baseAisleBlock,
});

export const leftAisleText = style({
  position: "relative",
  display: "block",
  alignItems: "center",
  ...themeVars.textStyle.small,
});

export const leftAisleIcon = style({
  width: "16px",
  height: "16px",
  marginRight: "8px",
  marginLeft: "4px",
  border: "1px solid white",
  borderRadius: "99px",
});

export const aisleWrapper = style({
  padding: "6px",
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

export const workspaceTopContainer = style({
  display: "block",
  width: "100%",
  height: "220px",
  padding: "8px",
  flex: "1 0 auto",
  ...baseBorder,
  backgroundColor: themeVars.color.background,
});

export const workspaceTopInner = style({
  flexDirection: "column",
  display: "flex",
  height: "100%",
});

export const workspaceBottomContainer = style({
  display: "block",
  width: "100%",
  height: "100%",
  flex: "1 1 auto",
  padding: "8px",
  marginTop: "12px",
  marginBottom: "0px",
  ...baseBorder,
  backgroundColor: themeVars.color.background,
});
