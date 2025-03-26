import { createVar, style } from "@vanilla-extract/css";
import { theme } from "@/styles/theme.css";
import * as constants from "@/styles/constants";

export const displayVar = createVar()
export const bottomVar = createVar()

export const visible = style({
  vars: {
    [displayVar]: "flex",
    [bottomVar]: "0",
  }
})

export const hidden = style({
  vars: {
    [displayVar]: "flex",
    [bottomVar] : `-${constants.FOOTERHEIGHT}`,
  }
})

export const footerContainer = style({
  width: "100%",
  position: "fixed",
  bottom: bottomVar,
  display: "flex",
  transition: "bottom 0.4s ease",
  flexDirection: "column",
  height: constants.FOOTERHEIGHT,
  gap: "32px",
  padding: "8px",
  backgroundColor: theme.color.black,
  ...theme.textStyle.heading4,
});
