"use client";

import { useEffect, useState } from "react";
import { BaseCard } from "@repo/ui/components";
import { useRouter } from "next/navigation";
import {
  BaseCanvas,
  ArchiveObjects,
  BaseCamera,
  BaseLights,
} from "@/components/three";
import { ProjectData, SceneData } from "@/@types/api";
import { getArchiveScenes } from "@/app/actions/archive";

export function ArchiveCard({ props }: { props: ProjectData }) {
  const { id, title, subtitle } = props;
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/archive?from=${id}`, { scroll: false });
  };
  return <BaseCard title={title} subtitle={subtitle} onClick={handleClick} />;
}

export function ArchiveContent({ id }: { id: string }) {
  const [scene, setScene] = useState<SceneData>();
  useEffect(() => {
    getArchiveScenes(id).then((r) => {
      if (r.success) {
        setScene(r.data[0]);
      }
    });
  }, [id]);
  return (
    <BaseCanvas>
      <ArchiveObjects objectInfos={scene?.children} />
      <BaseCamera />
      <BaseLights />
    </BaseCanvas>
  );
}
