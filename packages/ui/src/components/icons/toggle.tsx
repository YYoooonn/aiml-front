import Image from "next/image";
import { useSpring, animated } from '@react-spring/web';

import * as styles from "./icon.css";

export function ToggleIcon() {
    return (
      <Image
        src={`/icons/toggle.svg`}
        alt={`toggle icon`}
        width={24}
        height={24}
      />
    )
}

export function ToggleSmall() {
    return (
      <Image
          src={`/icons/toggle.svg`}
          alt={`toggle icon`}
          width={12}
          height={12}
        />
    )
}

export function ToggleSmallAnimated({show}: {show: boolean}) {
  const toggleSpring = useSpring({
    transform: show ? 'rotate(90deg)' : 'rotate(0deg)',
    config: { tension: 500, friction: 20 },
  });
  return (
    <animated.div 
      className={styles.smallIcon}
      style={toggleSpring}
    >
      <ToggleSmall />
    </animated.div>
    )
}