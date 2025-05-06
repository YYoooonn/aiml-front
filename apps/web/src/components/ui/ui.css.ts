import { createVar, style } from "@vanilla-extract/css";
import { theme } from "@/styles/theme.css";

export const formInputBlock = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
  height: "64px",
  ...theme.textStyle.body1,
});

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
  background: theme.color.ivory80,

  ":focus": {
    border: "none",
    background: theme.color.ivory,
  },
});

const baseButton = {
  height: "32px",
  alignContent: "center",
  borderRadius: "4px",
  cursor: "pointer",
  borderColor: theme.color.ivory,
};

export const submitButton = style({
  ...baseButton,
  width: "100%",
  textAlign: "center",
  border: "1px solid",
  backgroundColor: theme.color.black,
  color: theme.color.ivory,
  ":hover": {
    color: theme.color.black,
    borderColor: theme.color.neonGreen,
    backgroundColor: theme.color.neonGreen,
  },
});

export const buttonHeader = style({
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

export const boolButtonContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: "64px",
  ...theme.textStyle.body1,
});

export const varButtonWidth = createVar();

export const buttonSelected = style({
  ...baseButton,
  width: varButtonWidth,
  textAlign: "center",
  border: "1px solid",
  backgroundColor: theme.color.ivory,
  color: theme.color.black,
});

export const buttonUnselected = style({
  ...baseButton,
  width: varButtonWidth,
  textAlign: "center",
  border: "1px solid",
  backgroundColor: theme.color.black,
  color: theme.color.ivory,
});
