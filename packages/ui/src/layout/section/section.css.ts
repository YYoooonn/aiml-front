import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles";
import * as constants from "../constants";

export const landingSectionContainer = style({
  position: "relative",
  color: themeVars.color.text,
  width: "100%",
  height: "100%",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  paddingBottom: constants.FOOTERHEIGHT,
  // padding: "8px",
  // paddingLeft: "40px",
});

export const sampleLink = style({
  pointerEvents: "auto",
  ":hover": {
    color: themeVars.color.primary,
  },
});
