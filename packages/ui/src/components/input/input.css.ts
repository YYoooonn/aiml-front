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
  padding: "0 8px",
  height: "2rem",
  minHeight: "2rem",
  overflow: "hidden",
  border: globalTheme.border.bInset,
  background: themeVars.color.background,
  fontSize: "0.9rem",
  alignContent: "center",

  ":focus": {
    outline: "none",
    border: globalTheme.border.bSolid,
    borderColor: themeVars.color.borderDark,
    background: themeVars.color.backgroundDark,
  },
});
