import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles";

export const baseFormContainer = style({
  padding: themeVars.spacing.medium,
  width: "90vw",
  maxWidth: "780px",
  position: "relative",
  display: "block",
  wordWrap: "break-word",
  left: "50%",
  transform: "translate(-50%, 0)",
  // XXX test value
  color: themeVars.color.textDark,
  ...themeVars.textStyle.subtitle1,
});

export const formInputBlock = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
  height: "60px",
});

export const formTag = style({
  display: "block",
  width: "100%",
  ...themeVars.textStyle.heading5,
});
