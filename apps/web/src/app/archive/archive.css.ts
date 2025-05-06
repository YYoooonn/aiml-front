import { style } from "@vanilla-extract/css";
import { breakpoints } from "@/styles/breakpoints";
import { themeVars } from "@repo/ui/styles";

export const archiveTitle = style({
  padding: "8px",
  marginLeft: "16px",
  color: themeVars.color.text,
});

export const archiveContainer = style({
  width: "100%",
  height: "100%",
  display: "grid",
  gridTemplateColumns: "33% 33% 33%",
  ...themeVars.textStyle.xsmall,
  "@media": {
    [breakpoints.tablet]: {
      gridTemplateColumns: "50% 50%",
    },
    [breakpoints.mobile]: {
      gridTemplateColumns: "100%",
    },
  },
});

const baseArchiveItem = {
  display: "block",
  margin: "16px",
  aspectRatio: "360/316",

  color: themeVars.color.text,
  backgroundColor: themeVars.color.background,
  opacity: "70%",
  borderWidth: "1px",
};

export const archiveItem = style({
  ...baseArchiveItem,
  position: "relative",
  borderColor: themeVars.color.border,
  ":hover": {
    cursor: "pointer",
    opacity: "100%",
  },
});

export const archiveImage = style({
  width: "100%",
  height: "85%",
  border: "solid 1px",
  backgroundColor: themeVars.color.background,
  opacity: "50%",
});

export const archiveData = style({
  ...themeVars.textStyle.small,
  textAlign: "right",
});

export const archiveDataSubtitle = style({
  ...themeVars.textStyle.xsmall,
  padding: 0,
});
