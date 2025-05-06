import { style } from "@vanilla-extract/css";
import { breakpoints } from "@/styles/breakpoints";
import { theme } from "@/styles/theme.css";
import * as constants from "@/styles/constants";
import { themeVars } from "@repo/ui/styles";

export const projectPageHeader = style({
  width: "100%",
  ...themeVars.textStyle.medium,
});

export const userPageContainer = style({
  width: `calc(100% - 32px - ${constants.AISLEWIDTH})`,
  display: "block",
  marginLeft: `calc(32px + ${constants.AISLEWIDTH})`,
  "@media": {
    [breakpoints.lowTablet]: { marginLeft: 0, width: "100%" },
  },
});

export const projectContainer = style({
  // 내부 grid 단위의 margin 값과 동일
  width: `calc(100% + 2*${constants.GRIDGAP})`,
  transform: `translate(-${constants.GRIDGAP}, -${constants.GRIDGAP})`,

  height: "100%",
  display: "grid",
  gridTemplateColumns: "33% 33% 33%",
  // gridColumnGap: "32px",
  ...themeVars.textStyle.small,
  "@media": {
    [breakpoints.tablet]: {
      gridTemplateColumns: "50% 50%",
    },
    [breakpoints.mobile]: {
      gridTemplateColumns: "100%",
    },
  },
});
