import { style } from "@vanilla-extract/css";
import { theme } from "@/styles/theme.css";

export const CanvasContainer = style({
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(100, 0, 0, 0.1)",
  textAlign: "center",
  ...theme.textStyle.heading2,
});
