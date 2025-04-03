import { SetStateAction } from "react";
import { assignInlineVars } from "@vanilla-extract/dynamic";

import * as styles from "./ui.css";

interface ButtonWithHandler {
  text: string;
  handler: (e: React.MouseEvent) => Promise<void>;
}

interface ButtonWithDispatch {
  text: string;
  dispatch: React.Dispatch<SetStateAction<string>>;
}

export function ButtonSubmit({ text, handler }: ButtonWithHandler) {
  return (
    <div className={styles.submitButton} onClick={handler}>
      {text}
    </div>
  );
}

export function ButtonExit() {
  return (
    <div className={styles.buttonHeader}>
      {" "}
      <div className={styles.buttonExit} />
    </div>
  );
}

export function BoolButtons({
  textList,
  selected,
  setSelected,
}: {
  textList: string[];
  selected: string;
  setSelected: React.Dispatch<SetStateAction<string>>;
}) {
  // caculate width by button counts
  const widthPercentage = (90 / textList.length).toFixed().concat("%");

  return (
    <div className={styles.boolButtonContainer}>
      {textList.map((text, i) =>
        text === selected ? (
          // TODO 적절한 방법 다시 고민
          <BoolButtonSelected
            key={i}
            text={text}
            dispatch={setSelected}
            widthPercentage={widthPercentage}
          />
        ) : (
          <BoolButtonUnSelected
            key={i}
            text={text}
            dispatch={setSelected}
            widthPercentage={widthPercentage}
          />
        ),
      )}
    </div>
  );
}

function BoolButtonSelected({
  text,
  dispatch,
  widthPercentage,
}: { widthPercentage: string } & ButtonWithDispatch) {
  return (
    <div
      className={styles.buttonSelected}
      style={assignInlineVars({ [styles.varButtonWidth]: widthPercentage })}
      onClick={() => dispatch(text)}
    >
      {text}
    </div>
  );
}

function BoolButtonUnSelected({
  text,
  dispatch,
  widthPercentage,
}: { widthPercentage: string } & ButtonWithDispatch) {
  return (
    <div
      className={styles.buttonUnselected}
      style={assignInlineVars({ [styles.varButtonWidth]: widthPercentage })}
      onClick={() => dispatch(text)}
    >
      {text}
    </div>
  );
}
