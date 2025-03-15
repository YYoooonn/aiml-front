"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Archives } from "./_archives";
import { useModals } from "@/hook/useModals";
import { ArchiveModal } from "@/components/modal/archive";
import { ModalType } from "@/hook/useModalStore";
import { search } from "../_actions/project";

export default function Archive() {
  const [pageNum, setPageNum] = useState(0);
  const [keyword, setKeyword] = useState("");
  // XXX type
  const [archives, setArchives] = useState<Array<any>>([]);

  useEffect(() => {
    fetchArchive();
  }, [pageNum, keyword]);

  const fetchArchive = async () => {
    const publicPrjt = await search({
      n: pageNum,
      k: keyword,
      s: 21,
    });

    setArchives(publicPrjt.content);
  };

  return (
    <>
      {/* <div className={styles.archiveTitle}>archives</div> */}
      <Archives archives={archives} />
      <Suspense>
        <ArchiveRouter />
      </Suspense>
    </>
  );
}

// FIXME !!
function ArchiveRouter() {
  const { modals, open, close } = useModals();
  const searchParams = useSearchParams();
  useEffect(() => {
    const param = searchParams.get("from");
    if (param) {
      open(ArchiveModal, { id: param }, ModalType.ARCHIVE);
    }
    if (!param && modals) {
      close();
    }
  }, [searchParams]);

  return <></>;
}
