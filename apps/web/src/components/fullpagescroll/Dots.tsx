import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as styles from "./fps.css";

type PDot = {
  index: number;
  currentIndex: number;
  onClick: (index: number) => void;
};
const Dot: React.FC<PDot> = ({ index, currentIndex, onClick }) => {
  const selected = index === currentIndex;
  return (
    <div
      className={styles.dotBorder}
      style={assignInlineVars({
        [styles.dotSelected]: selected ? "#FF0000" : "transparent",
      })}
      onClick={() => onClick(index)}
    >
      <div className={styles.dot} />
    </div>
  );
};

type TDots = {
  limit: number;
  currentIndex: number;
  onDotClick: (index: number) => void;
};

export const Dots: React.FC<TDots> = ({ limit, currentIndex, onDotClick }) => {
  return (
    <div className={styles.dotOuterContainer}>
      <div className={styles.dotInnerContainer}>
        {Array(limit)
          .fill("")
          .map((_, index) => (
            <Dot
              key={index}
              index={index}
              currentIndex={currentIndex}
              onClick={onDotClick}
            ></Dot>
          ))}
      </div>
    </div>
  );
};
