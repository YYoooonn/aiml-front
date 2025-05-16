"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArchiveContent, ArchiveCard } from "./_archives";
import { useModals } from "@/hook/useModals";
import { ModalType } from "@/store/useModalStore";
import { read, search } from "@/app/_actions/project";

import { GridLayout } from "@repo/ui/layout";
import { PageHeader } from "@repo/ui/components/header";

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
    const publicPrjt = await search({
      n: pageNum,
      k: keyword,
      s: 21,
    });
    if (publicPrjt.success) {
      setArchives(publicPrjt.data.content);
    }
  };

  return (
    <>
      <PageHeader title="Archive"/>
      <GridLayout>
        {
          archives.map((val: ProjectData, i: number) => (
            <ArchiveCard key={i} props={val} />
          ))
        }
      </GridLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <ArchiveRouter />
      </Suspense>
    </>
  );
}

// FIXME !!
function ArchiveRouter() {
  const { modals, open, close } = useModals();
  const [id, setId] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [subtitle, setSubtitle] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const param = searchParams.get("from");
    if (param) {
      const pId = Number(param);
      read(pId).then((r) => {
        if (r.success) {
          setTitle(r.data.title);
          setSubtitle(r.data.subtitle);
          setId(param);
        }
      });
    } else {
      setTitle(null);
      setSubtitle(null);
    }
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
