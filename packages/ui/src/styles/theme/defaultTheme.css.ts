import { createTheme } from "@vanilla-extract/css";
import { themeVars } from "./themeContract.css";
import globalTheme from "./globalTheme.css";

const defaultTheme = createTheme(themeVars, {
  color: {
    primary: globalTheme.palette.orange,
    secondary: globalTheme.palette.blue,
    tertiary: globalTheme.palette.green,

    background: globalTheme.palette.white,
    backgroundDark: globalTheme.palette.gray300,

    border: globalTheme.palette.gray500,
    borderLight: globalTheme.palette.gray100,
    borderDark: globalTheme.palette.gray500,

    text: globalTheme.palette.black,
    textLight: globalTheme.palette.gray500,
    textDark: globalTheme.palette.black,
    textLightest: globalTheme.palette.gray100,
    textDarkest: globalTheme.palette.gray900,
    textPlaceholder: globalTheme.palette.gray400,
    textPlaceholderLight: globalTheme.palette.gray200,
    textPlaceholderDark: globalTheme.palette.gray600,
  },
  textStyle: {
    heading1: globalTheme.textStyle.heading1,
    heading2: globalTheme.textStyle.heading2,
    heading3: globalTheme.textStyle.heading3,
    heading4: globalTheme.textStyle.heading4,
    heading5: globalTheme.textStyle.heading5,
    body1: globalTheme.textStyle.body1,
    body2: globalTheme.textStyle.body2,
    subtitle1: globalTheme.textStyle.subtitle1,
    subtitle2: globalTheme.textStyle.subtitle2,
    subtitle3: globalTheme.textStyle.subtitle3,
  },
  font: {
    primary: globalTheme.rajdhani,
    secondary: globalTheme.ibm,
    tertiary: globalTheme.jetBrains,
  },
  spacing: {
    xsmall: globalTheme.spacing.s4,
    small: globalTheme.spacing.s8,
    medium: globalTheme.spacing.s12,
    large: globalTheme.spacing.s16,
    xlarge: globalTheme.spacing.s20,
  },
});

export default defaultTheme;
