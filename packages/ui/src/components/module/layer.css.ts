import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles";
import { moduleContainer } from "./module.css";

export const layerContainer = moduleContainer;

export const layerTag = style({
  ...themeVars.textStyle.subtitle2,
  padding: "4px",
  userSelect: "none",
  ":hover": {
    cursor: "pointer",
    color: themeVars.color.primary,
  },
});

export const layerTagSelected = style([
  layerTag,
  {
    fontWeight: "700",
    color: themeVars.color.primary,
  },
]);
