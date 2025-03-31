import { style } from "@vanilla-extract/css";
import { theme } from "@/styles/theme.css";
import * as constants from "@/styles/constants";

const baseContainer = {
  display: "block",
  margin: constants.GRIDGAP,
  aspectRatio: "360/316",

  color: theme.color.ivory,
  opacity: "70%",
  borderWidth: "1px",
};

export const cardContainer = style({
  ...baseContainer,
  position: "relative",
  selectors: {
    "&:hover": {
      cursor: "pointer",
      opacity: "100%",
    },
    "&:disabled:hover": {
      cursor: "none",
      opacity: "70%",
    },
  },
});

const baseCardImage = style({
  width: "100%",
  height: "85%",
  border: "solid 1px white",
  backgroundColor: theme.color.white,
  opacity: "50%",
});

export const cardImage = style([
  baseCardImage,
  {
    backgroundColor: theme.color.white,
  },
]);

export const newCardImage = style([
  baseCardImage,
  {
    backgroundColor: theme.color.red,
  },
]);

export const cardText = style({
  ...theme.textStyle.subtitle1,
  textAlign: "right",
});

export const cardSubtitle = style({
  ...theme.textStyle.subtitle2,
  padding: 0,
});
