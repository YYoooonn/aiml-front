"use client";

import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Dots } from "./Dots";
import * as styles from "./fps.css";
import { Footer } from "../components";

// milli second
const TIMEOUT = 1000;

type PFullPageScroll = {
  onPageChange?: (page: number) => void;
  onLoad?: (limit: number) => void;
} & PropsWithChildren;

export const FullPageScroll: React.FC<PFullPageScroll> = ({
  children,
  onLoad = () => {},
  onPageChange = () => {},
}) => {
  const outerDivRef = useRef<HTMLDivElement>(null);
  const currentPage = useRef<number>(0);
  const canScroll = useRef<boolean>(true);
  const oldTouchY = useRef<number>(0);
  const [_, refresh] = useState<number>(0);
  const [hide, setHide] = useState(true);
  const onChange = (current: number) => {
    if (outerDivRef.current) {
      setHide(current + 1 !== outerDivRef.current.childElementCount);
    }
  };

  const scrollDown = () => {
    const pageHeight = outerDivRef.current?.children.item(0)?.clientHeight; // 화면 세로 길이 100vh
    if (outerDivRef.current && pageHeight) {
      outerDivRef.current.scrollTo({
        top: pageHeight * (currentPage.current + 1),
        left: 0,
        behavior: "smooth",
      });
      canScroll.current = false;
      setTimeout(() => {
        canScroll.current = true;
      }, TIMEOUT);
      if (outerDivRef.current.childElementCount - 1 > currentPage.current)
        currentPage.current++;
    }
    // console.log(currentPage.current);
    onPageChange(currentPage.current);
    onChange(currentPage.current);
    refresh((v) => v + 1);
  };

  const scrollUp = () => {
    const pageHeight = outerDivRef.current?.children.item(0)?.clientHeight; // 화면 세로 길이 100vh
    if (outerDivRef.current && pageHeight) {
      outerDivRef.current.scrollTo({
        top: pageHeight * (currentPage.current - 1),
        left: 0,
        behavior: "smooth",
      });
      canScroll.current = false;
      setTimeout(() => {
        canScroll.current = true;
      }, TIMEOUT);
      if (currentPage.current > 0) currentPage.current--;
    }
    // console.log(currentPage.current);
    onPageChange(currentPage.current);
    onChange(currentPage.current);
    refresh((v) => v + 1);
  };

  const wheelHandler = useCallback((e: WheelEvent) => {
    e.preventDefault();
    if (!canScroll.current) return;
    const { deltaY } = e; // +is down -is up
    // console.log("scroll to", outerDivRef.current?.scrollHeight);
    if (deltaY > 0 && outerDivRef.current) {
      scrollDown();
    } else if (deltaY < 0 && outerDivRef.current) {
      scrollUp();
    }
  }, []); // wheel Handler

  const scrollHandler = useCallback((e: Event) => {
    e.preventDefault();
  }, []);

  const onTouchDown = useCallback((e: TouchEvent) => {
    oldTouchY.current = e.changedTouches.item(0)?.clientY || 0;
  }, []);

  const onTouchUp = useCallback((e: TouchEvent) => {
    const currentTouchY = e.changedTouches.item(0)?.clientY || 0;
    const isScrollDown: boolean =
      oldTouchY.current - currentTouchY > 0 ? true : false;

    if (isScrollDown) {
      scrollDown();
    } else {
      scrollUp();
    }
  }, []);

  useEffect(() => {
    const outer = outerDivRef.current;
    if (!outer) return;
    onLoad(outer.childElementCount);
    refresh((v) => v + 1);

    // 이벤트 핸들러 리스트
    const eventListeners: [keyof HTMLElementEventMap, EventListener][] = [
      ["wheel", wheelHandler as EventListener],
      ["scroll", scrollHandler as EventListener],
      ["touchmove", scrollHandler as EventListener],
      ["touchstart", onTouchDown as EventListener],
      ["touchend", onTouchUp as EventListener],
    ];

    eventListeners.forEach(([event, handler]) =>
      outer.addEventListener(event, handler),
    );
    return () => {
      eventListeners.forEach(([event, handler]) =>
        outer.removeEventListener(event, handler),
      );
    };
  }, [onLoad]);

  const movePageTo = (index: number) => {
    const num = currentPage.current;
    if (index > num) for (let i = 0; i < index - num; i++) scrollDown();
    else if (index < num) for (let i = 0; i < num - index; i++) scrollUp();
  };

  return (
    <>
      <div ref={outerDivRef} className={styles.outerContainer}>
        {children}
      </div>
      <Footer hide={hide} />
      <Dots
        limit={outerDivRef.current?.childElementCount || 0}
        currentIndex={currentPage.current}
        onDotClick={movePageTo}
      />
    </>
  );
};
