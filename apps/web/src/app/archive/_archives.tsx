"use client";

import { useEffect, useState } from "react";
import { BaseCard } from "@repo/ui/components";
import { useRouter } from "next/navigation";
import { read, search } from "@/app/_actions/project";
import { BaseCanvas, ArchiveObjects, BaseCamera, BaseLights } from "@/components/three";

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
  const pId = Number(id);
  const [objts, setObjts] = useState<TObjectData[]>([]);
  useEffect(() => {
    read(pId, "objects").then((r) => {
      if (r.success) {
        setObjts(r.data.objects);
      }
    });
  }, [id]);
  return (
    <BaseCanvas>
      <ArchiveObjects objectInfos={objts} />
      <BaseCamera />
      <BaseLights />
    </BaseCanvas>
  );
}
