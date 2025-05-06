import { style } from "@vanilla-extract/css";
import { theme } from "@/styles/theme.css";
import { leftAisleIcon, baseAisleBlock } from "../base.css";
import { themeVars } from "@repo/ui/styles";

export const userAisleIcon = style([
  leftAisleIcon,
  {
    ":hover": {
      cursor: "pointer",
    },
  },
]);

export const projectListContainer = style({
  ...baseAisleBlock,
  display: "block",
  marginLeft: "32px",
});

export const projectList = style({
  width: "100%",
  paddingBottom: "4px",
  ...themeVars.textStyle.medium,
});
