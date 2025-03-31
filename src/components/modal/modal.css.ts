import { style } from "@vanilla-extract/css";
import { breakpoints } from "@/styles/breakpoints";
import { theme } from "@/styles/theme.css";

const modalBackground = style({
  position: "fixed",
  display: "flex",
  overflowY: "auto",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  zIndex: 999,
  color: theme.color.ivory,
});

export const modalBackgroundWrapper = style([
  modalBackground,
  {
    backgroundColor: theme.color.black50,
  },
]);

export const modalBackgroundWrapperArchive = style([
  modalBackground,
  {
    backgroundColor: theme.color.black80,
  },
]);

export const archiveModalWrapper = style({
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  width: "90vw",
  maxWidth: "1400px",
  height: "calc(100vh - 24px)",
  marginTop: "12px",
  left: "50%",
  transform: "translate(-50%, 0)",
  border: "1px solid",
  borderColor: theme.color.ivory,
  "@media": {
    [breakpoints.lowTablet]: {
      width: "100vw",
      height: "100vh",
      marginTop: 0,
      border: "none",
    },
  },
});

export const modalWrapper = style({
  position: "absolute",
  left: "50%",
  transform: "translate(-50%, 0)",
  top: "84px",
  backgroundColor: theme.color.black,
});

export const pageModalInWrapper = style({
  height: "100%",
  width: "100%",
  padding: "12px",
});

export const modalHeader = style({
  width: "100%",
  display: "flex",
});

export const buttonExit = style({
  display: "block",
  float: "right",
  height: "16px",
  width: "16px",
  marginLeft: "auto",
  marginRight: 0,
  backgroundColor: theme.color.red70,
  ":hover": {
    backgroundColor: theme.color.red,
    cursor: "pointer",
  },
});

export const buttonSubmit = style({
  width: "100%",
  height: "32px",
  border: "1px dashed",
  padding: "4px",
  textAlign: "center",
  ":hover": {
    border: "2px solid",
  },
});
