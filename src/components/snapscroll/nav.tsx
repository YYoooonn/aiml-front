"use client";

import { useEffect, useRef, useState } from "react";
import { animated, SpringValue, useScroll, useSpring } from "@react-spring/web";
import * as styles from "./snap.css";

type TNav = {
  titles?: string[];
  length?: number;
  current: number;
  progress: number;
  phandler?: (i: number) => void;
};

export function Nav({ current, progress, length, titles, phandler }: TNav) {
  const containerRef = useRef<HTMLDivElement>(null!);
  const navRef = useRef<HTMLDivElement>(null!);
  const [navHeight, setNavHeight] = useState<string | number>("100%");
  const l = length ? length : 1;

  useEffect(() => {
    const handleSize = () => {
      if (navRef.current && containerRef.current) {
        setNavHeight(
          containerRef.current.offsetHeight - navRef.current.offsetHeight,
        );
      }
    };
    handleSize();
    window.addEventListener("resize", handleSize);
    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  // page index
  const [{ x }] = useSpring(
    {
      x: current,
      config: {
        mass: 1,
        tension: 1000,
        friction: 100,
        precision: 0.0001,
      },
    },
    [current],
  );

  // process index
  const [{ y }] = useSpring(
    {
      y: current + progress,
      config: {
        mass: 1,
        tension: 1000,
        friction: 100,
        precision: 0.0001,
      },
    },
    [progress],
  );

  const handleClick = (i: number) => {
    if (phandler) phandler(i);
  };

  return (
    <div ref={containerRef} className={styles.scrollContainer}>
      <div className={styles.navContainer} style={{ height: navHeight }}>
        <animated.h3
          className={styles.scrollNav}
          style={{
            top: x.to((val) => `${(val * 100) / l}%`),
          }}
        >
          {titles ? titles[Number(current)] : `${current}`}
        </animated.h3>
        <animated.h4
          className={styles.scrollNav}
          ref={navRef}
          style={{
            marginLeft: "0.5rem",
            top: y.to((val) => `${(val / l) * 100}%`),
          }}
        >
          {(Math.trunc(progress * 10) / 10).toFixed(1).substring(1)}
        </animated.h4>
      </div>
      <div className={styles.navContainer} style={{ height: navHeight }}>
        {Array.from({ length: l }, () => null).map((_, i) => {
          return (
            <h3
              className={styles.scrollNavSelector}
              onClick={() => handleClick(i)}
              key={i}
              style={{ top: `${(100 * i) / l}%` }}
            >
              {titles ? titles[i] : i}
            </h3>
          );
        })}
      </div>
    </div>
  );
}
