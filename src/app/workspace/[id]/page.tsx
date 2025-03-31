"use client";

import Workspace from "@/components/canvas/Workspace";
import * as styles from "../workspace.css";
import { useEffect } from "react";
import { useProjectInfo } from "@/hook/useProjectInfo";
import { useUserInfo } from "@/hook/useUserInfo";

export default function Page({ params }: { params: { id: string } }) {
  const { objects, fetch, reset } = useProjectInfo();
  const fetchUser = useUserInfo((s) => s.fetchUserInfo);

  useEffect(() => {
    fetch(params.id);
    fetchUser();
    return () => reset();
  }, []);

  return (
    <div className={styles.workspaceContainer}>
      <Workspace objts={objects} />
    </div>
  );
}
