import { create } from "zustand";

interface ChatState {
  isChatOn: boolean;
  setChatOn: () => void;
  setChatOff: () => void;
  // setChat: () => void,
}

export const useChat = create<ChatState>((set) => ({
  isChatOn: false,
  setChatOn: () => set(() => ({ isChatOn: true })),
  setChatOff: () => set(() => ({ isChatOn: false })),
}));
