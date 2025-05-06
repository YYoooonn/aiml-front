import { themeVars } from "@/styles";
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
  background: themeVars.color.background,

  ":focus": {
    border: "none",
    background: themeVars.color.backgroundDark,
  },
});

export const inputBlock = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
  height: "64px",
  ...themeVars.textStyle.subtitle1,
});
