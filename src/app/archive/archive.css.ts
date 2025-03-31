import { style } from "@vanilla-extract/css";
import { breakpoints } from "@/styles/breakpoints";
import { theme } from "@/styles/theme.css";

export const archiveTitle = style({
  padding: "8px",
  marginLeft: "16px",
  color: theme.color.white,
});

export const archiveContainer = style({
  width: "100%",
  height: "100%",
  display: "grid",
  gridTemplateColumns: "33% 33% 33%",
  ...theme.textStyle.subtitle1,
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

  color: theme.color.ivory,
  backgroundColor: theme.color.black,
  opacity: "70%",
  borderWidth: "1px",
};

export const archiveItem = style({
  ...baseArchiveItem,
  position: "relative",
  borderColor: theme.color.ivory,
  ":hover": {
    cursor: "pointer",
    opacity: "100%",
  },
});

export const archiveImage = style({
  width: "100%",
  height: "85%",
  border: "solid 1px",
  backgroundColor: theme.color.white,
  opacity: "50%",
});

export const archiveData = style({
  ...theme.textStyle.subtitle1,
  textAlign: "right",
});

export const archiveDataSubtitle = style({
  ...theme.textStyle.subtitle2,
  padding: 0,
});
