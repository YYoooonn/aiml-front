import { createVar, style } from "@vanilla-extract/css";
// import { theme } from "@/styles/theme.css";
import * as constants from "@/styles/constants";

export const outerContainer = style({
  height: `calc(100vh - ${constants.HEADERHEIGHT})`,
  width: "100%",
  overflow: "hidden",
});

export const dotOuterContainer = style({
  position: "fixed",
  top: 0,
  left: "calc(100% - 24px)",
  height: "100%",
  width: 1,
});

export const dotInnerContainer = style({
  position: "fixed",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
});

export const dotSelected = createVar();

export const dotBorder = style({
  width: "12px",
  height: "12px",
  border: "1px solid",
  borderColor: `${dotSelected}`,
  borderRadius: 9999,
  margin: "6px 0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const dot = style({
  position: "relative",
  width: "8px",
  height: "8px",
  borderRadius: 9999,
  backgroundColor: "white",
  cursor: "pointer",
});
