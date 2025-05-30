import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles";
import { globalTheme } from "../../styles/global";
import * as constants from "../../layout/constants";

export const cardContainer = style({
  display: "flex",
  flexDirection: "column",
  aspectRatio: "360/316",
  boxSizing: "border-box",

  position: "relative",
  selectors: {
    "&:hover": {
      cursor: "pointer",
    },
    "&:disabled:hover": {
      cursor: "none",
    },
  },
});

export const baseCardContainer = style({
  width: "100%",
  position: "relative",
  flex: 1,
  // border: globalTheme.border.bSolid,
});

export const baseCardImage = style({
  width: "100%",
  height: "100%",
  // flex: 1,
  // border: globalTheme.border.bSolid,
  backgroundColor: themeVars.color.backgroundDark,
  opacity: 0.5,
  position: "absolute",
});

export const cardOverlayContainer = style({
  position: "absolute",
  width: "100%",
  height: "100%",
  zIndex: 100,
});

export const cardOverlay = style({
  width: "100%",
  height: "100%",
  opacity: 0.5,
  backgroundColor: themeVars.color.backgroundDark,
});

export const cardTextBlock = style({
  height: "36px",
  textAlign: "right",
  color: themeVars.color.text,
  ...themeVars.textStyle.subtitle1,
});
