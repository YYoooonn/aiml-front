import { create } from "zustand";

export enum ModalType {
  FORM,
  ARCHIVE,
}

export interface ModalComponentProps<P = Record<string, unknown>> {
  Component: React.FC<P>;
  props?: P;
  type?: ModalType;
}

interface ModalState {
  modals: ModalComponentProps[];
  open: <P extends Record<string, unknown>>(
    Component: React.FC<P>,
    props?: P,
    type?: ModalType,
  ) => void;
  close: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  modals: [],
  open: <P extends Record<string, unknown>>(
    Component: React.FC<P>,
    props?: P,
    type?: ModalType,
  ) =>
    set((state) => ({
      modals: [
        ...state.modals,
        { Component, props, type } as ModalComponentProps,
      ],
    })),
  close: () =>
    set((state) => ({
      modals: state.modals.slice(0, -1),
    })),
}));
