import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles";

export const profileImgContainer = style({
  width: "100%",
  height: "24px",
  display: "flex",
  alignItems: "center",
});

export const profileIcon = style({
  width: "24px",
  height: "24px",
  borderRadius: "24px",
  marginLeft: "-4px",
  border: "0.5px solid black",
  display: "flex",
  backgroundColor: themeVars.color.secondary,
});

export const socketContainer = style({
  display: "block",
  position: "relative",
  width: "100%",
  height: "100%",
  flex: "0 1 auto",
  borderRadius: "4px",
});

export const socketHeaderContainer = style({
  display: "flex",
  alignContent: "center",
  alignItems: "center",
  height: "24px",
  ":hover": {
    cursor: "pointer",
    color: themeVars.color.primary,
  },
})

export const socketHeader = style({
  ...themeVars.textStyle.subtitle1,
  textAlign: "center",
  fontWeight: "600",
});

export const socketUserText = style({
  display: "flex",
  marginTop: "4px",
  ...themeVars.textStyle.subtitle2,
});
