import { style } from "@vanilla-extract/css";
import { themeVars } from "@repo/ui/styles";

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
  backgroundColor: themeVars.color.primary,
  ":hover": {
    backgroundColor: themeVars.color.secondary,
    cursor: "pointer",
  },
});

export const aisleTitle = style({
  display: "flex",
  ...themeVars.textStyle.small,
});

export const editBlockContainer = style({
  width: "100%",
  marginTop: "4px",
});

export const editorBlockTitle = style({
  width: "100%",
  ...themeVars.textStyle.small,
  ":hover": {
    cursor: "pointer",
  },
});

export const editorBlockTitleSelected = style({
  width: "100%",
  ...themeVars.textStyle.xsmall,
  ":hover": {
    cursor: "pointer",
  },
});

export const editorProp = style({
  padding: "4px",
  ...themeVars.textStyle.xsmall,
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
    borderColor: themeVars.color.borderLight,
  },

  borderColor: themeVars.color.borderDark,
});

export const editorButtonContainerSelected = style({
  ...editorBlock,
  borderColor: themeVars.color.border,
});

export const editorButtonContainerDisabled = style({
  ...editorBlock,
  border: "1px dashed",
  borderColor: themeVars.color.border,
  color: themeVars.color.text,
  ":hover": {},
});

export const dropDownContainer = style({});

export const selectorBlock = style({
  width: "100%",
  padding: "4px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: themeVars.color.background,
});

export const selectorTitle = style({
  minWidth: "25%",
  ...themeVars.textStyle.xsmall,
});

export const multiSelectorBlock = style({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const multiSelectorTextInput = style({
  width: "30%",
  ...themeVars.textStyle.xsmall,
});

export const selectorTextInput = style({
  width: "100%",
  ...themeVars.textStyle.xsmall,
});

export const buttonSubmit = style({
  width: "100%",
  padding: "4px",
  textAlign: "center",
  ":hover": {
    cursor: "pointer",
    color: themeVars.color.primary,
    boxShadow: "0 0 0 1px inset rgb(0,255,0)",
  },
});
