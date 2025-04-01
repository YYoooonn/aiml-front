import { style } from "@vanilla-extract/css";
import { theme } from "@/styles/theme.css";
import { breakpoints } from "@/styles/breakpoints";

export const archiveHeaderContainer = style({
  width: "100%",
  height: "50px",
  padding: "4px",
  "@media": {
    [breakpoints.lowTablet]: { padding: "2px" },
  },
});

export const buttonExit = style({
  display: "block",
  float: "right",
  height: "16px",
  width: "16px",
  marginLeft: "auto",
  marginRight: 0,
  backgroundColor: theme.color.red70,
  ":hover": {
    backgroundColor: theme.color.red,
    cursor: "pointer",
  },
});

export const archiveTitle = style({
  ...theme.textStyle.heading5,
  display: "flex",
});

export const archiveUser = style({
  ...theme.textStyle.body1,
  display: "flex",
});

export const archiveContentWrapper = style({
  position: "relative",
  width: "100%",
  height: "100%",
  borderTop: "1px solid",
  borderColor: theme.color.ivory,
});

export const archiveModalContainer = style({
  width: "100%",
  height: "100%",
  // position: "absolute",

  // padding: "20px",
  // paddingTop: "12px",
  color: theme.color.ivory,
  backgroundColor: theme.color.black,
});
