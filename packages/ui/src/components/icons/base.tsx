import * as style from "./icon.css";

interface IconProps {
  onClick?: () => void;
}

export function SmallIcon({ onClick }: IconProps) {
  return <div className={style.smallIcon} onClick={onClick}></div>;
}
