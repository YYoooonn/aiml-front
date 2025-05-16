import { createThemeContract } from "@vanilla-extract/css";

const DefaultTextstyle = {
  fontWeight: "",
  fontSize: "",
  lineHeight: "",
};

export const themeVars = createThemeContract({
  color: {
    primary: "",
    secondary: "",
    tertiary: "",

    background: "",
    backgroundDark: "",

    border: "",
    borderLight: "",
    borderDark: "",

    text: "",
    textLight: "",
    textDark: "",
    textLightest: "",
    textDarkest: "",
    textPlaceholder: "",
    textPlaceholderLight: "",
    textPlaceholderDark: "",
  },
  textStyle: {
    heading1: DefaultTextstyle,
    heading2: DefaultTextstyle,
    heading3: DefaultTextstyle,
    heading4: DefaultTextstyle,
    heading5: DefaultTextstyle,
    body1: DefaultTextstyle,
    body2: DefaultTextstyle,
    subtitle1: DefaultTextstyle,
    subtitle2: DefaultTextstyle,
    subtitle3: DefaultTextstyle,
  },
  font: {
    primary: "",
    secondary: "",
    tertiary: "",
  },
  spacing: {
    xsmall: "",
    small: "",
    medium: "",
    large: "",
    xlarge: "",
  },
});
