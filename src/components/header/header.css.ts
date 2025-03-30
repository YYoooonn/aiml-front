import { style } from "@vanilla-extract/css";
import { theme } from "@/styles/theme.css";
import * as constants from "@/styles/constants";
import { breakpoints } from "@/styles/breakpoints";

export const headerContainer = style({
  position: "fixed",
  display: "block",
  top: "0",
  left: "0",
  alignItems: "center",
  minWidth: "100vw",
  height: constants.HEADERHEIGHT,
  padding: "16px 32px 16px 32px",

  zIndex: 9999,
  // XXX TEST COLOR
  backgroundColor: theme.color.black,
  color: theme.color.white,
  ...theme.textStyle.body1,
  "@media": {
    [breakpoints.lowTablet]: { padding: "16px 16px 16px 16px" },
  },
});

export const logo = style({
  width: "max-content",
  height: constants.HEADERHEIGHT,
  padding: "4px",
  alignContent: "center",
  ...theme.textStyle.logo,
  ":hover": {
    cursor: "pointer",
    color: theme.color.red,
  },
  "@media": {
    [breakpoints.lowTablet]: { padding: 0 },
  },
});

export const headerBlock = style({
  display: "flex",
  height: "100%",
  alignItems: "center",
  justifyContent: "space-between",
});

export const headerLinkBlocks = style({
  display: "flex",
  height: "100%",
  width: "452px",
  justifyContent: "space-between",
  alignItems: "center",
  position: "relative",
});

export const headerLink = style({
  position: "relative",
  display: "block",
  alignItems: "center",
  textDecoration: "none",
});

export const profileImg = style({
  position: "relative",
  alignItems: "center",
  display: "flex",
  width: "24px",
  height: "24px",
  borderRadius: 9999,
  backgroundColor: theme.color.ivory,
  cursor: "pointer",
});

export const profileDropdown = style({
  position: "absolute",
  display: "flex",
  width: "200px",
  height: "84px",
  backgroundColor: theme.color.ivory,
  borderRadius: "16px",
  color: theme.color.black,
  right: 0,
  top: `calc(${constants.HEADERHEIGHT} - 16px)`,
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
  ...theme.textStyle.subtitle2,
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
    color: theme.color.red,
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
    color: theme.color.red,
  },
});

export const modalTest = style({
  display: "block",
  color: "black",
  backgroundColor: "white",
  ...theme.textStyle.heading1,
});
