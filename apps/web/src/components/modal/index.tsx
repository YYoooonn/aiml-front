"use client";

import { useModalStore, ModalType } from "@/store/useModalStore";
import { useRouter } from "next/navigation";
import { ModalLayout } from "@repo/ui/layout";

function ModalContainer() {
  const { modals, close } = useModalStore();
  const router = useRouter();

  const handleModalClose = () => {
    close();
  };

  const handleArchiveClose = () => {
    close();
    router.push("/archive", { scroll: false });
  };

  return (
    <>
      {modals.map((modal, i) => {
        const { Component, props, type } = modal;
        if (type === ModalType.ARCHIVE) {
          // ARCHIVE TYPE
          const { title, subtitle } = props as {
            title?: string;
            subtitle?: string;
          };
          return (
            <ModalLayout
              key={i}
              type="archive"
              handleClose={handleArchiveClose}
              title={title}
              subtitle={subtitle}
            >
              <Component {...props} />
            </ModalLayout>
          );
        } else {
          // FORM TYPE
          return (
            <ModalLayout handleClose={handleModalClose} type="form" key={i}>
              <Component {...props} />
            </ModalLayout>
          );
        }
      })}
    </>
  );
}

export default ModalContainer;
