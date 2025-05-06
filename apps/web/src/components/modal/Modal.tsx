"use client";

import { useModalStore, ModalType } from "@/store/useModalStore";

import { FormModalLayout, ArchiveModalLayout } from "./layouts";

function ModalContainer() {
  const { modals, close } = useModalStore();
  const handleModalClose = () => {
    close();
  };
  return (
    <>
      {modals.map((modal, i) => {
        const { Component, props, type } = modal;
        if (type === ModalType.ARCHIVE) {
          // ARCHIVE TYPE
          return (
            <ArchiveModalLayout key={i}>
              <Component {...props} />
            </ArchiveModalLayout>
          );
        } else {
          // FORM TYPE
          return (
            <FormModalLayout handleClose={handleModalClose} key={i}>
              <Component {...props} />
            </FormModalLayout>
          );
        }
      })}
    </>
  );
}

export default ModalContainer;
