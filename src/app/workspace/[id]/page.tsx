"use client";

import Workspace from "@/components/canvas/Workspace";
import * as styles from "../workspace.css";
import { useEffect } from "react";
import { useProjectStore } from "@/store/useProjectStore";
import { useUserInfo } from "@/hook/useUserInfo";

export default function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const { objects, fetch, reset } = useProjectStore();
  const fetchUser = useUserInfo((s) => s.fetchUserInfo);

  useEffect(() => {
    fetch(id);
    fetchUser();
    return () => reset();
  }, []);

  return (
    <div className={styles.workspaceContainer}>
      <Workspace objts={objects} />
    </div>
  );
}
