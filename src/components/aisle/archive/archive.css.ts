import { createVar, keyframes, style } from "@vanilla-extract/css";
import { theme } from "@/styles/theme.css";

import { baseAisleBlock, leftAisleIcon, leftAisleText } from "../base.css";

export const leftAisleSearchBlock = style({
  ...baseAisleBlock,
  backgroundColor: theme.color.gray5,
  borderRadius: "99px",
});

export const archiveAisleIcon = leftAisleIcon;

export const archiveAisleText = leftAisleText;
