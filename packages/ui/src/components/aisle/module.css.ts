import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles";
import { breakpoints, globalTheme } from "../../styles/global";
import { AISLEWIDTH, FOOTERHEIGHT, HEADERHEIGHT } from "../../layout/constants";

const AISLE_MARGIN = "32px";

const aisleContainer = style({
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  position: "fixed",
  width: AISLEWIDTH,
  height: `calc(100vh - ${HEADERHEIGHT} - ${FOOTERHEIGHT})`,
  top: HEADERHEIGHT,
  // top: "50%",
  // transform: "translate(0, -50%)",
  zIndex: 999,
  "@media": {
    [breakpoints.lowTablet]: { display: "none" },
  },
  ...themeVars.textStyle.subtitle3,
});

export const leftAisleContainer = style([
  aisleContainer,
  {
    float: "left",
    left: 0,
    marginLeft: AISLE_MARGIN,
  },
]);

export const rightAisleContainer = style([
  aisleContainer,
  {
    height: "auto",
    float: "right",
    right: 0,
    marginRight: AISLE_MARGIN,
  },
]);

export const baseBorder = style({
  border: globalTheme.border.bSolid,
});

export const moduleWrapper = style([
  baseBorder,
  {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: "8px",
    backgroundColor: themeVars.color.background,
    color: themeVars.color.text,
    overflow: "hidden",
  },
]);

const TOP_MODULE_HEIGHT = "220px";

export const topModuleContainer = style([
  baseBorder,
  {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: TOP_MODULE_HEIGHT,
    padding: "8px",
    backgroundColor: themeVars.color.background,
    color: themeVars.color.text,
  },
]);

export const bottomModuleContainer = style([
  baseBorder,
  {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    width: "100%",
    padding: "8px",
    marginTop: "12px",
    marginBottom: "0px",
    overflowY: "hidden",
    backgroundColor: themeVars.color.background,
  },
]);

export const moduleInner = style({
  flex: 1,
  padding: "4px",
  flexDirection: "column",
  width: "100%",
  overflowY: "auto",
});
