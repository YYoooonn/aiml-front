"use client";

import { useState } from "react";
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
      <CardImage image={props.image} />
      <div className={styles.cardTextBlock}>
        {props.title}
        <div style={{ ...themeVars.textStyle.subtitle2 }}>{props.subtitle}</div>
      </div>
    </div>
  );
}

function CardImage({ image }: { image?: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={styles.baseCardContainer}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {hovered && <CardOverlay />}
      <div
        className={styles.baseCardImage}
        // style={{ backgroundImage: `url(${image})` }}
      />
    </div>
  );
}

function CardOverlay() {
  return (
    <div className={styles.cardOverlayContainer}>
      <div className={styles.cardOverlay} />
    </div>
  );
}
