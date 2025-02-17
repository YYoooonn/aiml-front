import { createVar, keyframes, style } from "@vanilla-extract/css";
import { theme } from "@/styles/theme.css";
import { bordertest } from "../test.css";

export const headerContainer = style({
  display: "flex",
  flexDirection: "row",
  gap: "32px",
  padding: "8px",
  borderBottom: "1px solid",
  ...theme.textStyle.heading4,
});

export const logo = style({
  width: "max-content",
  ":hover": {
    cursor: "pointer",
    color: theme.color.red,
  },
});
