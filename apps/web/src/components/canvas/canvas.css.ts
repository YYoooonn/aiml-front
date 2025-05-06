import { style } from "@vanilla-extract/css";
import { theme } from "@/styles/theme.css";
import * as constants from "@/styles/constants";

export const workspaceContainer = style({
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(100, 0, 0, 0.1)",
  textAlign: "center",
  ...theme.textStyle.subtitle1,
});

export const canvasWrapper = style({
  width: "100%",
  height: `calc(100vh - ${constants.HNFHEIGHT})`,
});

export const archiveCanvasWrapper = style({
  width: "100%",
  height: "100%",
});
