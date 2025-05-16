import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles";

export const moduleContainer = style({
  position: "relative",
  display: "block",
  flexDirection: "column",
  pointerEvents: "auto",
  overflowY: "hidden",
  color: themeVars.color.text,
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
});
