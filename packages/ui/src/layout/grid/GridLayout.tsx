import * as style from "./grid.css";


export function GridLayout({children}: {children: React.ReactNode}) {
  return <div className={style.gridContainer}>{children}</div>;
}
