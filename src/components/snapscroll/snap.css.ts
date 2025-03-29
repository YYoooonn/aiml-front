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
  position: "fixed",
  width: "100%",
  height: `calc(100% - ${constants.HEADERHEIGHT})`,
  overflowY: "scroll",
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
    color: theme.color.theme1,
  },
});

export const scrollDetail = style({
  position: "fixed",
  top: 0,
  right: 0,
  textAlign: "right",
});

export const sectionContainer = style({
  color: theme.color.ivory,
  position: "fixed",
  overflow: "hidden",
  width: "100%",
  height: "100%",
  // FIXME : 단순히 포인터 이벤트 안받는 방식으로 변경
  zIndex: 99,
  pointerEvents: "none",
  // scrollPaddingBottom: "100px",
  ...theme.textStyle.logo,
});
