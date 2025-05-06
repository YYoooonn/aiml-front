import { style } from "@vanilla-extract/css";
import * as constants from "@/styles/constants";
import { breakpoints } from "@/styles/breakpoints";

export const aisleLayoutContainer = style({
  minWidth: "100%",
  minHeight: "100%",
});

const baseAislePageContainer = {
  width: "auto",
  height: "100%",
  "@media": {
    [breakpoints.lowTablet]: { marginLeft: 0, marginRight: 0 },
  },
};

export const aislePageContainer = style({
  marginLeft: `calc(32px + ${constants.AISLEWIDTH})`,
  ...baseAislePageContainer,
});

export const leftAislePageContainer = style({
  marginLeft: `calc(32px + ${constants.AISLEWIDTH})`,
  ...baseAislePageContainer,
});

export const bothAislePageContainer = style({
  marginLeft: `calc(32px + ${constants.AISLEWIDTH})`,
  marginRight: `calc(32px + ${constants.AISLEWIDTH})`,
  ...baseAislePageContainer,
});

export const defaultLayoutContainer = style({
  display: "block",
  position: "relative",
  padding: "16px",
  width: "100%",
  height: "100%",
});
