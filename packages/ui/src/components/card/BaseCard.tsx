import { themeVars } from "../../styles";
import * as styles from "./card.css";

interface CardProps {
  title: string;
  subtitle?: string;
  image?: string;
  onClick: (e: React.MouseEvent) => void;
}

export function BaseCard(props: CardProps) {
  return (
    <div className={styles.cardContainer} onClick={props.onClick}>
      <div
        className={styles.baseCardImage}
        //style={{ backgroundImage: `url(${props.image})` }}
      />
      <div className={styles.cardTextBlock}>
        {props.title}
        <div style={{ ...themeVars.textStyle.subtitle2 }}>
          {props.subtitle}
        </div>
      </div>
    </div>
  );
}
