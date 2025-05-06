import { style } from "@vanilla-extract/css";
import { theme } from "@/styles/theme.css";
import { baseBorder } from "../aisle.css";
import { themeVars } from "@repo/ui/styles";

export const aisleWrapper = style({
  padding: "6px",
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

export const workspaceContainer = style({
  flexDirection: "column",
  display: "flex",
  height: "100%",
});

export const workspaceTopContainer = style({
  display: "block",
  width: "100%",
  height: "220px",
  padding: "8px",
  flex: "1 0 auto",
  ...baseBorder,
  backgroundColor: themeVars.color.background,
});

export const workspaceTopInner = style({
  flexDirection: "column",
  display: "flex",
  height: "100%",
});

export const workspaceBottomContainer = style({
  display: "block",
  width: "100%",
  height: "100%",
  flex: "1 1 auto",
  padding: "8px",
  marginTop: "12px",
  marginBottom: "0px",
  ...baseBorder,
  backgroundColor: themeVars.color.background,
});

export const aisleHeader = style({
  width: "100%",
  // margin: "4px",
  display: "flex",
  position: "relative",
  alignItems: "center",
});

export const returnIcon = style({
  width: "12px",
  height: "12px",
  marginRight: "4px",
  display: "flex",
  borderRadius: "100px",
  backgroundColor: themeVars.color.primary,
  ":hover": {
    backgroundColor: themeVars.color.primary,
    cursor: "pointer",
  },
});

export const projectTitle = style({
  display: "flex",
  ...themeVars.textStyle.small,
});

export const profileImgContainer = style({
  marginTop: "8px",
  width: "100%",
  height: "24px",
  marginLeft: "8px",
  display: "block",
  alignItems: "center",
});

export const usersContainer = style({
  display: "block",
  width: "100%",
  marginTop: "12px",
  height: "100%",
  flex: "0 1 auto",
  padding: "6px",
  borderRadius: "4px",
  backgroundColor: themeVars.color.background,
});

export const socketHeader = style({
  ...themeVars.textStyle.small,
});

export const socketUser = style({
  display: "flex",
  marginTop: "4px",
  ...themeVars.textStyle.small,
});

export const profileIcon = style({
  width: "20px",
  height: "20px",
  borderRadius: "20px",
  marginLeft: "-8px",
  border: "1px solid black",
  display: "flex",
  backgroundColor: themeVars.color.secondary,
});

export const headerButtonContainer = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
});

const headerButton = {
  display: "block",
  height: "24px",
  width: "50px",
  alignContent: "center",
};

export const headerButtonUnSelected = style({
  ...headerButton,
  ...themeVars.textStyle.large,
  userSelect: "none",
  textAlign: "center",
  ":hover": {
    cursor: "pointer",
    ...themeVars.textStyle.large,
    // backgroundColor: theme.color.ivory30,
    // borderRadius: "4px",
  },
});

export const headerButtonSelected = style({
  ...headerButton,
  ...themeVars.textStyle.medium,
  userSelect: "none",
  textAlign: "center",
  borderRadius: "4px",
  backgroundColor: themeVars.color.backgroundDark,
});

export const bottomContentContainer = style({
  width: "100%",
  height: "100%",
  marginTop: "4px",
  padding: "6px",
});

export const layerContainer = style({
  overflowY: "scroll",
  display: "flex",
  flexDirection: "column",
});

const layerText = style({
  ...themeVars.textStyle.xsmall,
  padding: "4px",
  userSelect: "none",
  ":hover": {
    cursor: "pointer",
    color: "#FFEA00",
  },
});

export const layerTag = style([layerText]);

export const layerTagSelected = style([
  layerText,
  {
    fontWeight: "700",
    color: "#FFEA00",
  },
]);

export const chatWrapper = style({
  width: "100%",
  height: "100%",
});
