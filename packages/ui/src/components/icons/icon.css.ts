import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles";
import { globalTheme } from "../../styles/global";

export const smallIcon = style({
  width: "16px",
  height: "16px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "100px",
  marginRight: "2px",
  // backgroundColor: themeVars.color.primary,
  ":hover": {
    cursor: "pointer",
  },
});
