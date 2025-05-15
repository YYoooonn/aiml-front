import { style } from "@vanilla-extract/css";
import { breakpoints } from "../../styles/global";
import { themeVars } from "../../styles";

export const gridContainer = style({
    display: "grid",
    width: "100%",
    height: "max-content",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    // gridColumnGap: "32px",
    ...themeVars.textStyle.subtitle3,
    "@media": {
      [breakpoints.tablet]: {
        gridTemplateColumns: "repeat(2, 1fr)",
      },
      [breakpoints.mobile]: {
        gridTemplateColumns: "repeat(1, 1fr)",
      },
    },
  });
  