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

export const SnapPageScroll: FC<PSnapPageScroll> = ({ titles, children }) => {
  const totalLength = children ? children.length : 1;
  const [page, setPage] = useState(0);

  // TODO progress to be used for animation
  const [progress, setProgress] = useState(0);

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

  const handlePage = ({ p, progress }: { p: number; progress: number }) => {
    setPage(p);
    setProgress(progress);
  };

  return (
    <div className={styles.outerContainer}>
      <ALayer children={children} current={current} />
      <Nav length={totalLength} titles={titles} phandler={handlePage} />
    </div>
  );
};

const ALayer = ({
  children,
  current,
}: {
  current: SpringValue;
  children?: ReactNode[];
}) => {
  return (
    <>
      {children?.map((child, i) => {
        return (
          <animated.section
            key={i}
            onWheel={(e) => {
              e.stopPropagation();
            }}
            className={styles.sectionContainer}
            style={{
              y: current.to([i - 1, i], ["100%", "0"]),
            }}
          >
            {child}
          </animated.section>
        );
      })}
    </>
  );
};

// const [{y}] = useSpring({
//   y: progress,
//   config: {
//       mass: 1, tension: 1000, friction: 100, precision: 0.0001
//   }
// }, [progress])
