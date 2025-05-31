import * as styles from "./layout.css";

interface EditorPageLayoutProps {
  navigation?: React.ReactNode;
  children: React.ReactNode;
}

export function EditorPageLayout({
  navigation,
  children,
}: EditorPageLayoutProps) {
  return (
    <div className={styles.editorPageContainer}>
      {navigation ? navigation : null}
      <div className={styles.edtiorContent}>{children}</div>
    </div>
  );
}

interface NavigationProps<T> {
  navigations: T[];
  selected?: T;
  setSelected?: (nav: T) => void;
}

export function EditorNavigation<T>({
  navigations,
  selected,
  setSelected,
}: NavigationProps<T>) {
  return (
    <div className={styles.editorNavigationContainer}>
      {navigations.map((nav, index) => (
        <div
          key={index}
          className={
            selected === nav ? styles.navigationSelected : styles.navigationItem
          }
          onClick={() => setSelected?.(nav)}
        >
          {nav as string}
        </div>
      ))}
    </div>
  );
}
