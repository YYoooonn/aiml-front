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

export const formBlockContainer = style({
  display: "flex",
  flexDirection: "column",
  // justifyContent: "space-between",
  width: "100%",
  minHeight: "60px",
  marginBottom: "1rem",
});

export const formTag = style({
  display: "block",
  width: "100%",
  marginBottom: "1rem",
  ...themeVars.textStyle.heading5,
});
