import { style } from "@vanilla-extract/css";
import { theme } from "@/styles/theme.css";
import * as constants from "@/styles/constants";
// import { breakpoints } from "@/styles/breakpoints";
import { themeVars } from "@repo/ui/styles";

export const workspaceContainer = style({
  display: "block",
  position: "fixed",
  // top: constants.HEADERHEIGHT,
  left: 0,
  width: "100%",
  height: `calc(100% - ${constants.HNFHEIGHT})`,
  // minHeight: `calc(100% - ${constants.HNFHEIGHT})`,
  backgroundColor: themeVars.color.background,
  //   textAlign: "center",
  // border: "1px solid",
  // borderColor: theme.color.white,
  ...themeVars.textStyle.large,
});
