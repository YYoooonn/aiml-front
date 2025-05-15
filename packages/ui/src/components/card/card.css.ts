import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles";
// import { globalTheme } from "../../styles/global";
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

export const baseCardImage = style({
  width: "100%",
  flex: 1,
  backgroundColor: themeVars.color.backgroundDark,

  // border: globalTheme.border.bSolid,
  opacity: "50%",
});

export const cardTextBlock = style({
  height: "36px",
  textAlign: "right",
  color: themeVars.color.text,
  ...themeVars.textStyle.subtitle1,
});
