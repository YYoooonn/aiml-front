"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArchiveContent, ArchiveCard } from "./_archives";
import { useModals } from "@/hook/useModals";
import { ModalType } from "@/store/useModalStore";
import { searchArchive } from "../actions/search";

import { GridLayout } from "@repo/ui/layout";
import { PageHeader } from "@repo/ui/components/header";
import { ProjectData } from "@/@types/api";

export default function Archive() {
  // const [pageNum, setPageNum] = useState(0);
  // const [keyword, setKeyword] = useState<string>("");
  // FIXME : need to be implemented
  const [archives, setArchives] = useState<Array<ProjectData>>([]);
  const pageNum = 0;
  const keyword = "";

  // FIXME
  useEffect(() => {
    fetchArchive();
  }, []);

  const fetchArchive = async () => {
    const res = await searchArchive({
      pageNum: pageNum,
      keyword: keyword,
      pageSize: 21,
    });
    if (res.success) {
      setArchives(res.data.projects);
    }
  };

  return (
    <>
      <PageHeader title="Archive" />
      <GridLayout>
        {archives.map((val: ProjectData, i: number) => (
          <ArchiveCard key={i} props={val} />
        ))}
      </GridLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <ArchiveRouter archives={archives} />
      </Suspense>
    </>
  );
}

// FIXME !!
function ArchiveRouter({ archives }: { archives: Array<ProjectData> }) {
  const archiveMap = new Map<string, ProjectData>();
  archives.forEach((archive) => {
    archiveMap.set(archive.id, archive);
  });

  const { modals, open, close } = useModals();
  const [id, setId] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [subtitle, setSubtitle] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const param = searchParams.get("from");
    const selected = param ? archiveMap.get(param) : null;
    if (selected) {
      setTitle(selected.title);
      setSubtitle(selected.subtitle ? selected.subtitle : "");
      setId(param);
    }
    return () => {
      setTitle(null);
      setSubtitle(null);
      setId(null);
    };
  }, [searchParams]);

  useEffect(() => {
    if (id && modals && title) {
      open(
        ArchiveContent,
        { id: id, title: title, subtitle: subtitle },
        ModalType.ARCHIVE,
      );
    }
    if (!title && modals) {
      close();
    }
  }, [id, title, subtitle]);

  return null;
}
