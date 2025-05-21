import { ToggleSmallAnimated } from "../icons";
import { SmallIcon } from "../icons/base";

import * as styles from "./nav.css";

interface SideNavProps {
  text: string;
  onClick: () => void;
  imgUrl?: string;
  children?: React.ReactNode;
}

export function BaseSideNav({ text, imgUrl, onClick }: SideNavProps) {
  return (
    <div className={styles.leftAisleBlock} onClick={onClick}>
      <SmallIcon />
      <div className={styles.leftAisleText}>{text}</div>
    </div>
  );
}

interface DropdownSideNavProps extends SideNavProps {
  show: boolean;
  textSize?: string;
}

export function DropdownSideNav({
  text,
  onClick,
  children,
  show,
  textSize,
}: DropdownSideNavProps) {
  return (
    <>
      <div className={styles.leftAisleBlock} onClick={onClick}>
        <ToggleSmallAnimated show={show} />
        <div
          className={styles.leftAisleText}
          style={textSize ? { fontSize: textSize } : {}}
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
