import { ArrowLeftSmall, SettingSmallAnimated } from "../icons";
import * as styles from "./ui.css";

export function SelectionHeader({
  selected,
  selections,
  setSelected,
}: {
  selections: string[];
  selected: string;
  setSelected: (value: string) => void;
}) {
  return (
    <div className={styles.selectionHeaderContainer}>
      {selections.map((s, i) => {
        return (
          <SelectionTag
            key={s}
            text={s}
            selected={s === selected}
            handler={() => setSelected(s)}
          />
        );
      })}
    </div>
  );
}

function SelectionTag({
  text,
  selected,
  handler,
}: {
  text: string;
  selected: boolean;
  handler: () => void;
}) {
  return (
    <div
      className={selected ? styles.selectedTag : styles.baseTag}
      onClick={handler}
    >
      {text}
    </div>
  );
}

export function WorkspaceHeader({
  title,
  show,
  handleExit,
  handleToggle,
}: {
  title?: string;
  show: boolean;
  handleExit?: () => void;
  handleToggle?: () => void;
}) {
  return (
    <div className={styles.aisleTopHeader}>
      <div className={styles.returnIcon} onClick={handleExit}>
        <ArrowLeftSmall />
      </div>
      <div className={styles.projectTitle}>
        {title ? title : "PROJECT NAME"}
      </div>
      <div className={styles.editIcon} onClick={handleToggle}>
        <SettingSmallAnimated show={show} />
      </div>
    </div>
  );
}
