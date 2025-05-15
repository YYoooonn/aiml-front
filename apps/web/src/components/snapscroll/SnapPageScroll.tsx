"use client";

import {
  FC,
  PropsWithChildren,
  ReactNode,
  useRef,
  useState,
  useMemo,
  Children,
  useCallback,
} from "react";
import { animated, SpringValue, useScroll, useSpring } from "@react-spring/web";
import * as styles from "./snap.css";
import { Nav } from "./nav";

type PSnapPageScroll = {
  titles?: string[];
  children?: ReactNode[];
} & PropsWithChildren;

const DAMP = 2;
const LAST_PAGE_TOLERANCE = 0.01;

export const SnapPageScroll: FC<PSnapPageScroll> = ({ titles, children }) => {
  const pages = useMemo(() => Children.toArray(children), [children]);

  const l = children ? children.length : 1;
  const containerRef = useRef<HTMLDivElement>(null!);
  const [page, setPage] = useState(0);
  const [progress, setProgress] = useState(0); // TODO progress to be used for animation

  useScroll({
    container: containerRef,
    onChange: ({ value: { scrollYProgress } }) => {
      const t = Math.min(scrollYProgress * l, l - LAST_PAGE_TOLERANCE);
      setPage(Math.floor(t));
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

  const scrollToPage = useCallback(
    (i: number) => {
      if (!containerRef.current) return;
      const targetY =
        ((DAMP * l - 1) / (DAMP * l)) *
        containerRef.current.clientHeight *
        i *
        DAMP;

      containerRef.current.scrollTo({
        top: Math.ceil(targetY),
        behavior: "smooth",
      });
    },
    [l],
  );

  return (
    <div ref={containerRef} className={styles.snapContainer}>
      <Nav
        length={l}
        titles={titles}
        current={page}
        progress={progress}
        phandler={scrollToPage}
      />
      <ALayer current={current} l={l}>
        {pages}
      </ALayer>
      {
        // empty array of scroll
        new Array(l * DAMP).fill(null).map((_, i) => (
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
      style={{ height: `${DAMP * l * 100}%` }}
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
