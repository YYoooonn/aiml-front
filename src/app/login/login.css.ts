import { style } from "@vanilla-extract/css";
import { theme } from "@/styles/theme.css";
// import * as constants from "@/styles/constants";

export const loginPageContainer = style({
  display: "block",
  position: "relative",
  padding: "16px",
  width: "100%",
  height: "100%",
});

export const loginFormContainer = style({
  padding: "12px",
  width: "90vw",
  maxWidth: "752px",
  position: "absolute",
  display: "block",
  wordWrap: "break-word",
  top: "16px",
  left: "50%",
  transform: "translate(-50%, 0)",
  // XXX test value
  backgroundColor: theme.color.black,
  color: theme.color.ivory,
});

export const formHeader = style({
  width: "100%",
  display: "flex",
});

export const buttonExit = style({
  display: "block",
  float: "right",
  height: "16px",
  width: "16px",
  marginLeft: "auto",
  marginRight: 0,
  backgroundColor: theme.color.red70,
  ":hover": {
    backgroundColor: theme.color.red,
    cursor: "pointer",
  },
});
