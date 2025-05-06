import { style } from "@vanilla-extract/css";
import { breakpoints } from "@/styles/breakpoints";
import { themeVars } from "@repo/ui/styles";
import * as constants from "@/styles/constants";

const aisleContainer = {
  display: "flex",
  // color: "black",
  width: constants.AISLEWIDTH,
  height: `calc(100vh - ${constants.HNFHEIGHT})`,
  alignSelf: "top",
  zIndex: 999,
  "@media": {
    [breakpoints.lowTablet]: { display: "none" },
  },
  ...themeVars.textStyle.subtitle3,
};

export const baseBorder = {
  border: "1px solid",
  // XXX Color test
  // borderColor: theme.color.white,
  borderColor: themeVars.color.border,
  borderRadius: "16px",
};

export const rightAisleContainer = style({
  overflowX: "hidden",
  position: "fixed",

  flexDirection: "column",
  float: "right",

  right: 0,
  marginRight: "32px",

  ...aisleContainer,
});

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

export const aisleInnerWrapper = style({
  display: "block",
  width: "100%",
  height: "100%",
  padding: "16px",
  ...baseBorder,
  backgroundColor: themeVars.color.background,
  color: themeVars.color.text,
});
