import * as styles from "./base.css";

export function RightAisleLayout({ children }: React.PropsWithChildren) {
  return <div className={styles.rightAisleContainer}>{children}</div>;
}

export function BaseNavLayout({ children }: React.PropsWithChildren) {
  return (
    <div className={styles.aisleInnerWrapper}>
      <BaseSideNav />
      {children}
    </div>
  );
}

export function BaseSideNav() {
  return (
    <>
      <AisleButton text={"Profile"}>
        <div className={styles.leftAisleIcon} />
      </AisleButton>
      <AisleButton text={"Create"}>
        <div className={styles.leftAisleIcon} />
      </AisleButton>
      <AisleButton text={"Upload"}>
        <div className={styles.leftAisleIcon} />
      </AisleButton>
    </>
  );
}

export function AisleButton({
  children,
  text,
}: {
  text: string;
} & React.PropsWithChildren) {
  return (
    <div className={styles.leftAisleBlock}>
      {children}
      <div className={styles.leftAisleText}>{text}</div>
    </div>
  );
}
