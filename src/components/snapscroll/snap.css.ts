import { createVar, keyframes, style } from "@vanilla-extract/css";
import { theme } from "@/styles/theme.css";
import * as constants from "@/styles/constants";

export const emptyFull = style({
  width: "100%",
  height: "100%",
});

export const outerContainer = style({
  position: "relative",
  height: "100%",
  width: "100%",
  overflowY: "hidden",
  // scrollSnapType: "y mandatory",
  // selectors: {
  //   "&::-webkit": {
  //     WebkitOverflowScrolling: "touch",
  //   },
  //   "&::-webkit-scrollbar": {
  //     display: "none",
  //   },
  // },
});

export const scrollContainer = style({
  position: "absolute",
  width: "100%",
  height: "100%",
  zIndex: 99,
  overflowY: "auto",
  scrollBehavior: "smooth",
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
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
    color: theme.color.green,
  },
});

export const scrollDetail = style({
  position: "fixed",
  top: 0,
  right: 0,
  textAlign: "right",
});

export const sectionContainer = style({
  position: "fixed",
  color: theme.color.ivory,
  overflow: "hidden",
  width: "100%",
  height: "100%",
  // scrollPaddingBottom: "100px",

  ...theme.textStyle.logo,
});
