"use client";

import { usePathname } from "next/navigation";
import { LeftAisleContainer } from "./layout";
import User from "./module/user";
import Archive from "./module/archive";
import Workspace from "./module/workspace";

export default function LeftAisle() {
  return (
    <LeftAisleContainer>
      <LeftAisleContent />
    </LeftAisleContainer>
  );
}

export function LeftAisleContent() {
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
