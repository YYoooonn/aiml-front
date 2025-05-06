import { globalStyle } from "@vanilla-extract/css";

globalStyle("*", {
  fontFamily: "var(--font-radjhani)",
  boxSizing: "border-box",
  padding: 0,
  margin: 0,
});

globalStyle("html, body, #__next", {
  height: "100vh",
  width: "100vw",
  overflowX: "hidden",
});

globalStyle("a", {
  color: "inherit",
});
