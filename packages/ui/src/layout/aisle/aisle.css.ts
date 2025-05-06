import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles";
import { breakpoints } from "../../styles/global";
import { AISLEWIDTH, HEADERHEIGHT } from "../constants";

const AISLE_MARGIN = "32px";

const aisleContainer = style({
  display: "flex",
  overflow: "hidden",
  position: "fixed",
  width: AISLEWIDTH,
  height: `calc(100vh - ${HEADERHEIGHT})`,
  alignSelf: "top",
  zIndex: 999,
  "@media": {
    [breakpoints.lowTablet]: { display: "none" },
  },
  ...themeVars.textStyle.subtitle3,
});

export const leftAisleContainer = style([
  aisleContainer,
  {
    flexDirection: "column",
    float: "left",
    left: 0,
    marginLeft: AISLE_MARGIN,
  },
]);

export const rightAisleContainer = style([
  aisleContainer,
  {
    flexDirection: "column",
    float: "right",
    right: 0,
    marginRight: AISLE_MARGIN,
  },
]);
