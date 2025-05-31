import { TObject3DBase, TObject3DData } from "@/@types/api";
import { DEFAULT_MATRIX } from "@/utils/constants";
import { create } from "zustand";

type Object3DStore = {
  object3DInfo: Partial<TObject3DBase> & { transform: typeof DEFAULT_MATRIX };
  selected: Record<string, TObject3DData>;
  setSelected: (data: Record<string, TObject3DData>) => void;
  setObject3DInfo: (data: Partial<TObject3DBase>) => void;
  clearSelected: () => void;
};

const DEFAULT = {
  name: "",
  visible: true,
  transform: DEFAULT_MATRIX,
  type: undefined as TObject3DData["type"] | undefined,
  parentId: null as string | null,
};

const object3DStore = create<Object3DStore>()((set, get) => ({
  object3DInfo: DEFAULT,
  selected: {},

  setSelected: (updated) => {
    const { setObject3DInfo } = get();

    const val = Object.values(updated);
    if (val.length === 0) setObject3DInfo({ ...DEFAULT, type: undefined });
    else if (val.length === 1) setObject3DInfo({ ...val[0]!! });
    else setObject3DInfo({ ...DEFAULT, type: "GROUP" });

    set({ selected: updated });
  },
  setObject3DInfo: (data) => {
    // const { name, visible, transform, type, parentId } = data;
    const { object3DInfo } = get();
    set({
      object3DInfo: {
        ...object3DInfo,
        ...data,
        transform: data.transform || DEFAULT_MATRIX,
      },
    });
  },
  clearSelected: () => set({ object3DInfo: DEFAULT, selected: {} }),
}));

export default object3DStore;
