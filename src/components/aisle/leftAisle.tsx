"use client";

import { usePathname } from "next/navigation";
import User from "./user";
import Archive from "./archive";
import Workspace from "./workspace";
import * as styles from "./aisle.css";

export function LUserAisle() {
  return (
    <LeftAisleContainer>
      <User />
    </LeftAisleContainer>
  );
}

export function LArchiveAisle() {
  return (
    <LeftAisleContainer>
      <Archive />
    </LeftAisleContainer>
  );
}
export function LWorkspaceAisle() {
  return (
    <LeftAisleContainer>
      <Workspace />
    </LeftAisleContainer>
  );
}

function LeftAisleContainer({ children }: React.PropsWithChildren) {
  return <div className={styles.leftAisleContainer}>{children}</div>;
}

/* deprecated */
export function LeftAisle() {
  return (
    <LeftAisleContainer>
      <LeftAisleContent />
    </LeftAisleContainer>
  );
}

/* deprecated */
function LeftAisleContent() {
  const [pathname, id] = usePathname().split("/").slice(1, 3);

  if (pathname === "user") {
    return <User />;
  } else if (pathname === "archive") {
    return <Archive />;
  } else if (pathname === "workspace") {
    return <Workspace id={id} />;
  } else if (pathname === "test") {
    return <Workspace id={id} />;
  }
  return <></>;
}
