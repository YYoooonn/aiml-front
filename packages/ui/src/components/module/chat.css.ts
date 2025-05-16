import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles";
import { moduleContainer } from "./module.css";

export const chatContainer = moduleContainer;

export const chatInputContainer = style({
  display: "flex",
  position: "relative",
  alignItems: "center",
  overflowX: "hidden",
  flexDirection: "row",
  float: "left",
  minWidth: "100%",
  padding: "0.1rem",
  backgroundColor: themeVars.color.backgroundDark,
  ...themeVars.textStyle.subtitle3,
});

export const chatInput = style({
  overflowX: "hidden",
  flexDirection: "column",
  float: "left",
  width: "100%",
  border: "none",
  color: themeVars.color.text,
  backgroundColor: "transparent",
  ...themeVars.textStyle.subtitle2,
  ":focus": {
    outline: "none",
    border: "none",
  },
});

export const chatMessageHeader = style({
  paddingTop: "12px",
  ...themeVars.textStyle.subtitle1,
});

export const chatMessageContainer = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
  overflowX: "hidden",
  wordBreak: "break-word",
});

export const chatMessage = style({
  ...themeVars.textStyle.subtitle2,
  width: "100%",
});
