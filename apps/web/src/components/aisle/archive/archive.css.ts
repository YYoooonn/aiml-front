import { createVar, keyframes, style } from "@vanilla-extract/css";
import { themeVars } from "@repo/ui/styles";

import { baseAisleBlock, leftAisleIcon, leftAisleText } from "../base.css";

export const leftAisleSearchBlock = style({
  ...baseAisleBlock,
  backgroundColor: themeVars.color.backgroundDark,
  borderRadius: "99px",
});

export const archiveAisleIcon = leftAisleIcon;

export const archiveAisleText = leftAisleText;
