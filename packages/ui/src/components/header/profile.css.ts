import { style } from "@vanilla-extract/css";
import { headerLink } from "./header.css";
import { themeVars } from "../../styles";
import * as constants from "../../layout/constants";

export const profileLink = style([headerLink]);

export const profileImg = style({
  position: "relative",
  alignItems: "center",
  display: "flex",
  width: "24px",
  height: "24px",
  borderRadius: 9999,
  backgroundColor: themeVars.color.backgroundDark,
  cursor: "pointer",
});

export const profileDropdown = style({
  position: "absolute",
  display: "flex",
  width: "200px",
  height: "84px",
  backgroundColor: themeVars.color.backgroundDark,
  borderRadius: "16px",
  color: themeVars.color.textDark,
  right: "12px",
  zIndex: 1000,
  top: `calc(${constants.HEADERHEIGHT} - 12px)`,
});

export const profileInnerWrapper = style({
  width: "100%",
  height: "100%",
  padding: "8px 20px 8px 20px",
  lineHeight: "24px",
  justifyContent: "center",
});

const baseDropdwonList = {
  width: "100%",
  display: "block",
  ...themeVars.textStyle.subtitle2,
};

export const dropdownList = style({
  textAlign: "center",
  ...baseDropdwonList,
});

export const dropdownListSelectable = style({
  textAlign: "center",
  ...baseDropdwonList,
  ":hover": {
    cursor: "pointer",
    color: themeVars.color.primary,
  },
});

export const dropdownButtonWrapper = style({
  display: "flex",
  alignItems: "center",
});

export const dropdownButton = style({
  width: "50%",
  height: "100%",
  textAlign: "center",
  display: "block",
  ":hover": {
    cursor: "pointer",
    color: themeVars.color.primary,
  },
});
