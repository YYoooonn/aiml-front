"use client";

import { useEffect, useRef, useState } from "react";
import { animated, SpringValue, useScroll, useSpring } from "@react-spring/web";
import * as styles from "./snap.css";

type TNav = {
  titles?: string[];
  length?: number;
  phandler?: ({ p, progress }: { p: number; progress: number }) => void;
};

export function Nav({ length, titles, phandler }: TNav) {
  const containerRef = useRef<HTMLDivElement>(null!);
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const l = length ? length : 1;

  useEffect(() => {
    if (phandler) phandler({ p: current, progress: progress });
  }, [current, progress]);

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

  useScroll({
    container: containerRef,
    onChange: ({ value: { scrollYProgress } }) => {
      // FIXME : last page issue -> quick fix with tolerance
      const t = scrollYProgress * l - 0.001;
      setCurrent(t - (t % 1));
      setProgress(t % 1);
    },
    default: {
      immediate: true,
    },
  });

  const handleClick = (i: number) => {
    containerRef.current.scrollTo({
      top: Math.ceil(((l - 1) / l) * containerRef.current.clientHeight * i),
      behavior: "smooth",
    });
  };

  return (
    <div ref={containerRef} className={styles.scrollContainer}>
      <div className={styles.navContainer}>
        <div style={{ display: "flex", width: "100%", alignItems: "bottom" }}>
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
            style={{
              marginLeft: "0.5rem",
              top: y.to((val) => `${(val / l) * 100}%`),
            }}
          >
            {(Math.trunc(progress * 10) / 10).toFixed(1).substring(1)}
          </animated.h4>
        </div>
      </div>
      <div className={styles.navContainer}>
        {Array.from({ length: l }, () => null).map((_, i) => {
          return (
            <div
              key={i}
              style={{ display: "flex", width: "100%", alignItems: "bottom" }}
            >
              <h3
                className={styles.scrollNavSelector}
                onClick={() => handleClick(i)}
                key={i}
                style={{ top: `${(100 * i) / l}%` }}
              >
                {titles ? titles[i] : i}
              </h3>
            </div>
          );
        })}
      </div>
      {new Array(l).fill(null).map((_, i) => (
        <div key={i} style={{ height: "100%" }} />
      ))}
    </div>
  );
}
