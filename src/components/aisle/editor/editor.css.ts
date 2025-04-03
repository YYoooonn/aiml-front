import { style } from "@vanilla-extract/css";
import { theme } from "@/styles/theme.css";

import { aisleInnerWrapper } from "../base.css";

export const editorInnerWrapper = aisleInnerWrapper;

export const aisleHeader = style({
  width: "100%",
  // margin: "4px",
  display: "flex",
  position: "relative",
  alignItems: "center",
});

export const returnIcon = style({
  width: "12px",
  height: "12px",
  marginRight: "4px",
  display: "flex",
  borderRadius: "100px",
  backgroundColor: theme.color.red70,
  ":hover": {
    backgroundColor: theme.color.red,
    cursor: "pointer",
  },
});

export const aisleTitle = style({
  display: "flex",
  ...theme.textStyle.subtitle1,
});

export const editBlockContainer = style({
  width: "100%",
  marginTop: "4px",
});

export const editorBlockTitle = style({
  width: "100%",
  ...theme.textStyle.subtitle1,
  ":hover": {
    cursor: "pointer",
  },
});

export const editorBlockTitleSelected = style({
  width: "100%",
  ...theme.textStyle.subtitle2,
  ":hover": {
    cursor: "pointer",
  },
});

export const editorProp = style({
  padding: "4px",
  ...theme.textStyle.subtitle2,
});

const editorBlock = {
  padding: "4px",
  width: "100%",
  userSelect: "none" as const,
  border: "1px solid",
};

export const editorButtonContainer = style({
  ...editorBlock,
  ":hover": {
    cursor: "pointer",
    borderStyle: "solid",
    borderColor: theme.color.ivory,
  },

  borderColor: theme.color.ivory30,
});

export const editorButtonContainerSelected = style({
  ...editorBlock,
  borderColor: theme.color.ivory,
});

export const editorButtonContainerDisabled = style({
  ...editorBlock,
  border: "1px dashed",
  borderColor: theme.color.ivory30,
  color: theme.color.ivory30,
  ":hover": {},
});

export const dropDownContainer = style({});

export const selectorBlock = style({
  width: "100%",
  padding: "4px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: theme.color.ivory30,
});

export const selectorTitle = style({
  minWidth: "25%",
  ...theme.textStyle.subtitle2,
});

export const multiSelectorBlock = style({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const multiSelectorTextInput = style({
  width: "30%",
  ...theme.textStyle.subtitle2,
});

export const selectorTextInput = style({
  width: "100%",
  ...theme.textStyle.subtitle2,
});

export const buttonSubmit = style({
  width: "100%",
  padding: "4px",
  textAlign: "center",
  ":hover": {
    cursor: "pointer",
    color: theme.color.neonGreen,
    boxShadow: "0 0 0 1px inset rgb(0,255,0)",
  },
});
