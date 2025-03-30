"use client";

import { FC, PropsWithChildren, ReactNode, useRef, useState } from "react";
import { animated, SpringValue, useScroll, useSpring } from "@react-spring/web";
import * as styles from "./snap.css";
import { Nav } from "./nav";

type PSnapPageScroll = {
  titles?: string[];
  children?: ReactNode[];
} & PropsWithChildren;

type TPHandler = {
  p: number;
  progress: number;
};

const SCALE_SCROLL = 2;

export const SnapPageScroll: FC<PSnapPageScroll> = ({ titles, children }) => {
  const l = children ? children.length : 1;
  const containerRef = useRef<HTMLDivElement>(null!);
  const [page, setPage] = useState(0);
  const [progress, setProgress] = useState(0); // TODO progress to be used for animation

  useScroll({
    container: containerRef,
    onChange: ({ value: { scrollYProgress } }) => {
      // FIXME : last page issue -> quick fix with tolerance
      const t = Math.min(scrollYProgress * l, l - 0.01);
      setPage(t - (t % 1));
      setProgress(t % 1);
    },
    default: {
      immediate: true,
    },
  });

  const [{ current }] = useSpring(
    {
      current: page,
      config: {
        mass: 2,
        tension: 1000,
        friction: 100,
        precision: 0.0001,
      },
    },
    [page],
  );

  const phandler = (i: number) => {
    containerRef.current.scrollTo({
      top: Math.ceil(
        ((SCALE_SCROLL * l - 1) / (SCALE_SCROLL * l)) *
          containerRef.current.clientHeight *
          i *
          SCALE_SCROLL,
      ),
      behavior: "smooth",
    });
  };

  return (
    <div ref={containerRef} className={styles.snapContainer}>
      <Nav
        length={l}
        titles={titles}
        current={page}
        progress={progress}
        phandler={phandler}
      />
      <ALayer children={children} current={current} l={l} />
      {
        // empty array of scroll
        new Array(l * SCALE_SCROLL).fill(null).map((_, i) => (
          <div key={i} style={{ height: "100%" }} />
        ))
      }
    </div>
  );
};

type TAnimatedLayer = {
  current: SpringValue;
  l: number;
  children?: ReactNode[];
};

const ALayer = ({ children, current, l }: TAnimatedLayer) => {
  return (
    <div
      className={styles.snapAnimateContainer}
      style={{ height: `${SCALE_SCROLL * l * 100}%` }}
    >
      <div className={styles.snapAnimateSectionContainer}>
        {children?.map((child, i) => {
          return (
            <animated.div
              key={i}
              className={styles.snapSection}
              style={{ y: current.to([i - 1, i], ["100%", "0"]) }}
            >
              {child}
            </animated.div>
          );
        })}
      </div>
    </div>
  );
};
