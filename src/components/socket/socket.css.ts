import { style } from "@vanilla-extract/css";
import { breakpoints } from "@/styles/breakpoints";
import { theme } from "@/styles/theme.css";

export const projectContainer = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  pointerEvents: "auto",
  overflowY: "auto",
  color: "white",
  backgroundColor: "black",
  minHeight: "20vh",
  width: "100%",
  zIndex: 100,
  selectors: {
    "&::before": {
      content: "''",
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
    },
  },
  "@media": {
    [breakpoints.lowTablet]: { padding: 0 },
  },
});

export const chatContainer = style({
  position: "relative",
  display: "block",
  flexDirection: "column",
  pointerEvents: "auto",
  overflowY: "hidden",
  color: theme.color.ivory,
  width: "100%",
  zIndex: 100,
  selectors: {
    "&::before": {
      content: "''",
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
    },
  },
  "@media": {
    [breakpoints.lowTablet]: { padding: 0 },
  },
});

export const chatHeaderContainer = style({
  position: "relative",
  borderBottom: "2px solid",
  ...theme.textStyle.subtitle2,
});

export const userHeaderContainer = style({
  position: "relative",
  paddingTop: "12px",
  borderBottom: "1px solid",
  ...theme.textStyle.subtitle2,
});

export const chatMessageContainer = style({
  minWidth: "100%",
});

export const chatMessageHeader = style({
  paddingTop: "12px",
  ...theme.textStyle.subtitle1,
});

export const chatInputContainer = style({
  display: "flex",
  position: "relative",
  alignItems: "center",
  overflowX: "hidden",
  flexDirection: "row",
  float: "left",
  minWidth: "100%",
  padding: "2px",
  backgroundColor: theme.color.ivory30,
  ...theme.textStyle.subtitle1,
});

export const chatInput = style({
  overflowX: "hidden",
  flexDirection: "column",
  float: "left",
  width: "100%",
  border: "none",
  color: theme.color.ivory,
  backgroundColor: "transparent",
  ...theme.textStyle.subtitle2,
  ":focus": {
    outline: "none",
    border: "none",
  },
});

export const buttonSubmit = style({
  display: "block",
  marginLeft: "auto",
  marginRight: 0,
  overflowX: "hidden",
  float: "right",
  width: "12px",
  height: "12px",
  border: "1px solid",
  borderRadius: "12px",
  textAlign: "center",
  backgroundColor: theme.color.ivory30,
  ...theme.textStyle.medium,
  ":hover": {
    backgroundColor: theme.color.ivory,
  },
});

export const textStyle = style({
  ...theme.textStyle.medium,
  width: "100%",
});

export const chatLogContainer = style({
  display: "block",
  height: "100%",
  maxWidth: "100%",
  overflowY: "auto",
  wordWrap: "break-word",
});

export const buttonExit = style({
  display: "block",
  ":hover": {
    color: "red",
    cursor: "pointer",
  },
});
