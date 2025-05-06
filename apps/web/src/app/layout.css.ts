import { style } from "@vanilla-extract/css";
import { breakpoints } from "@/styles/breakpoints";
import * as constants from "@/styles/constants";
import { themeVars } from "@repo/ui/styles";

export const layoutContainer = style({
  minHeight: "100vh",
  width: "100vw",
  position: "fixed",
  inset: 0,
  pointerEvents: "auto",
  overflowY: "auto",
  color: themeVars.color.text,
  backgroundColor: themeVars.color.background,
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

export const pageContentContainer = style({
  position: "absolute",
  minWidth: "100%",
  height: "100vh",
  paddingTop: `${constants.HEADERHEIGHT}`,
  // TODO: SUBTRACT ONLY HEADER?
  // height: `calc(100vh - ${constants.HEADERHEIGHT} - ${constants.FOOTERHEIGHT})`,
});

export const mainContentContainer = style({
  width: "100%",
  height: "100%",
  "@media": {
    [breakpoints.lowTablet]: { width: "100%" },
    [breakpoints.mobile]: { width: "100%" },
  },
});

export const backgroundContainer = style({
  position: "fixed",
  width: "100vw",
  height: "calc(100vh + 12px)",
  overflow: "none",
  zIndex: -100,
});

export const backgroundImage = style({
  objectFit: "cover",
});
