import { style } from "@vanilla-extract/css";
import { breakpoints } from "../../styles/global";
import * as constants from "../constants";
import { themeVars } from "../../styles";

export const aisleLayoutContainer = style({
  width: "100%",
  height: "100%",
});

const baseAislePageContainer = style({
  width: "auto",
  height: "100%",
  "@media": {
    [breakpoints.lowTablet]: { marginLeft: 0, marginRight: 0 },
  },
});

export const aislePageContainer = style([
  baseAislePageContainer,
  {
    marginLeft: `calc(32px + ${constants.AISLEWIDTH})`,
  },
]);

export const leftAislePageContainer = style([
  baseAislePageContainer,
  {
    marginLeft: `calc(32px + ${constants.AISLEWIDTH})`,
  },
]);

export const bothAislePageContainer = style([
  baseAislePageContainer,
  {
    marginLeft: `calc(32px + ${constants.AISLEWIDTH})`,
    marginRight: `calc(32px + ${constants.AISLEWIDTH})`,
  },
]);

export const pageContentContainer = style({
  position: "absolute",
  minWidth: "100%",
  height: "100vh",
  paddingTop: `${constants.HEADERHEIGHT}`,
  // TODO: SUBTRACT ONLY HEADER?
  // height: `calc(100vh - ${constants.HEADERHEIGHT} - ${constants.FOOTERHEIGHT})`,
});

export const defaultLayoutContainer = style({
  display: "block",
  position: "relative",
  padding: "16px",
  width: "100%",
  height: "100%",
});

export const layoutWrapper = style({
  display: "flex",
  flexDirection: "column",
  width: "100vw",
  height: "100vh",
  backgroundColor: themeVars.color.background,
});

export const header = style({
  width: "100%",
  height: constants.HEADERHEIGHT,
});

export const footer = style({
  width: "100%",
  height: constants.FOOTERHEIGHT,
});

export const mainContentContainer = style({
  flex: 1,
  overflowY: "auto",
  overflowX: "hidden",
  paddingLeft: "32px",
  paddingRight: "32px",
  "@media": {
    [breakpoints.lowTablet]: { paddingLeft: "16px", paddingRight: "16px" },
  },
});

export const editorPageContainer = style({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "row",
  overflow: "hidden",
  "@media": {
    [breakpoints.lowTablet]: {
      flexDirection: "column",
    },
  },
});

export const edtiorContent = style({
  flex: 1,
  display: "flex",
  overflowY: "auto",
  flexDirection: "column",
});

export const editorNavigationContainer = style({
  // height: "100%",
  minWidth: "240px",
  display: "flex",
  flexDirection: "column",
  "@media": {
    [breakpoints.lowTablet]: {
      flexDirection: "row",
    },
  },
});

export const navigationItem = style({
  padding: "8px 16px",
  cursor: "pointer",
  selectors: {
    "&:hover": {
      backgroundColor: themeVars.color.backgroundDark,
    },
  },
});

export const navigationSelected = style([
  navigationItem,
  {
    backgroundColor: themeVars.color.backgroundDark,
    color: themeVars.color.textDark,
    fontWeight: 700,
  },
]);
