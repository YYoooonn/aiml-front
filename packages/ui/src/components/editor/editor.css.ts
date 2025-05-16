import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles";
import { globalTheme } from "../../styles/global";

export const editorBlockTitle = style({
  width: "100%",
  ...themeVars.textStyle.subtitle2,
  ":hover": {
    cursor: "pointer",
  },
});

export const editorBlockTitleDisabled = style({
  width: "100%",
  ...themeVars.textStyle.subtitle2,
  ":hover": {
    cursor: "default",
  },
});

export const editorBlockHeader = style({});

export const editorBlockContent = style({
  marginTop: "4px",
});

const editorBlock = style({
  padding: "4px",
  width: "100%",
  userSelect: "none" as const,
  border: globalTheme.border.bOutset,
});

export const editorButtonContainer = style([
  editorBlock,
  {
    ":hover": {
      cursor: "pointer",
      border: globalTheme.border.bSolid,
    },
  },
]);

export const editorButtonContainerSelected = style([
  editorBlock,
  {
    borderColor: themeVars.color.border,
  },
]);

export const editorButtonContainerDisabled = style([
  editorBlock,
  {
    color: themeVars.color.textLight,
    backgroundColor: themeVars.color.backgroundDark,
    ":hover": {
      cursor: "default",
    },
  },
]);
