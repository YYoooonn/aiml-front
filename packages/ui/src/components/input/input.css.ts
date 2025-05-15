import { themeVars } from "../../styles";
import { globalTheme } from "../../styles/global";
import { style } from "@vanilla-extract/css";

export const formTag = style({
  display: "block",
  width: "100%",
});

export const textInput = style({
  width: "100%",
  display: "block",
  marginTop: "auto",
  height: "32px",
  marginBottom: 0,
  overflow: "hidden",
  border: "none",
  borderBottom: globalTheme.border.bDashed,
  background: themeVars.color.background,

  ":focus": {
    border: globalTheme.border.bSolid,
    background: themeVars.color.backgroundDark,
  },
});
