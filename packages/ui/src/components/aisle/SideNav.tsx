import { ToggleSmallAnimated } from "../icons";
import { SmallIcon } from "../icons/base";

import * as styles from "./nav.css";

interface SideNavProps {
  text: string;
  onClick: () => void;
  selected?: boolean;
  imgUrl?: string;
  children?: React.ReactNode;
}

export function BaseSideNav({ text, imgUrl, selected, onClick }: SideNavProps) {
  return (
    <div className={styles.leftAisleBlock} onClick={onClick}>
      <SmallIcon />
      <div className={selected? styles.leftAisleTextSelected : styles.leftAisleText}>{text}</div>
    </div>
  );
}

interface DropdownSideNavProps extends SideNavProps {
  show: boolean;
  textSize?: string;
  onToggle?: () => void;
}

export function DropdownSideNav({
  text,
  onClick,
  onToggle,
  children,
  show,
  selected,
  textSize,
}: DropdownSideNavProps) {
  return (
    <>
      <div className={styles.leftAisleBlock} >
        <ToggleSmallAnimated show={show} onClick={onToggle}/>
        <div
          className={selected? styles.leftAisleTextSelected : styles.leftAisleText}
          style={textSize ? { fontSize: textSize } : {}}
          onClick={onClick}
        >
          {text}
        </div>
      </div>
      <div className={styles.dropdownContainer}>{show && children}</div>
    </>
  );
}

interface DropdownSelectorProps {
  text: string;
  onClick: () => void;
}

export function DropdownSelector({ text, onClick }: DropdownSelectorProps) {
  return (
    <div className={styles.dropdownSelector} onClick={onClick}>
      {text}
    </div>
  );
}
