import { createGlobalTheme } from "@vanilla-extract/css";
import { palettes } from "../constants/palettes";
import { textStyle } from "../constants/textStyles";

// CHECK 폰트 변경시 체크 필요
const ibm = `--font-ibm-plex-sans`;
const jetBrains = `--font-jetbrains-mono`;
const goudy = `--font-goudy-bookletter`;
const rajdhani = `--font-radjhani`;

const spacing = {
  s4: "4px",
  s8: "8px",
  s12: "12px",
  s16: "16px",
  s20: "20px",
};

const border = {
  bSolid: "1px solid",
  bDashed: "1px dashed",
  bDotted: "1px dotted",
  bDouble: "1px double",
  bGroove: "1px groove",
  bRidge: "1px ridge",
  bInset: "0.1rem inset",
  bOutset: "0.1rem outset",
};

const globalTheme = createGlobalTheme(":root", {
  ibm: `var(${ibm})`,
  jetBrains: `var(${jetBrains})`,
  goudy: `var(${goudy})`,
  rajdhani: `var(${rajdhani})`,
  border: border,
  palette: palettes,
  textStyle: textStyle,
  spacing: spacing,
});

export default globalTheme;
