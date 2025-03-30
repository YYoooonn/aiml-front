import { createVar, keyframes, style } from "@vanilla-extract/css";
import { theme } from "@/styles/theme.css";
import * as constants from "@/styles/constants";

export const snapContainer = style({
  position: "relative",
  width: "100%",
  height: "100%",
  overflowY: "auto",
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

export const snapAnimateContainer = style({
  position: "absolute",
  width: "100%",
  // height: "100%", height should be parallel to behind
});

export const snapAnimateSectionContainer = style({
  position: "sticky",
  height: `calc(100vh - ${constants.HEADERHEIGHT})`,
  overflow: "hidden",
  top: 0,
  // scrollPaddingBottom: "100px",
  color: theme.color.ivory,
  ...theme.textStyle.logo,
});

export const snapSection = style({
  position: "absolute",
  height: "100%",
  width: "100%",
});

export const scrollContainer = style({
  position: "fixed",
  height: `calc(100% - ${constants.HEADERHEIGHT})`,
  right: "24px",
  zIndex: 10,
});

export const navContainer = style({
  position: "sticky",
  alignItems: "right",
  justifyContent: "center",
  float: "right",
  top: 0,
  right: "28px",
  height: "100%",
});

const baseNav = {
  position: "absolute" as "absolute",
  textAlign: "center" as "center",
  verticalAlign: "bottom",
};

export const scrollNav = style({
  ...baseNav,
});

export const scrollNavSelector = style({
  ...baseNav,
  opacity: 0.1,
  ":hover": {
    cursor: "pointer",
    opacity: 1,
    color: theme.color.theme1,
  },
});

export const scrollDetail = style({
  position: "fixed",
  top: 0,
  right: 0,
  textAlign: "right",
});
