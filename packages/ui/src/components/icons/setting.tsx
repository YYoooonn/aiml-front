import Image from "next/image";
import { useSpring, animated } from "@react-spring/web";

import * as styles from "./icon.css";
import { useState } from "react";

export function SettingSmall() {
  return (
    <Image
      style={{
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      src={`/icons/editIcon.svg`}
      alt={`edit rect icon`}
      width={16}
      height={16}
    />
  );
}

export function SettingSmallAnimated({ show }: { show: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  const hoveredSpring = useSpring({
    transform: show ? "rotate(180deg)" : "rotate(0deg)",
    config: { tension: 300, friction: 50 },
  });
  return (
    <animated.div
      className={styles.smallIcon}
      style={hoveredSpring}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SettingSmall />
    </animated.div>
  );
}
