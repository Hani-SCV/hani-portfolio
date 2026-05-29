import { create } from "zustand";

type ThemeColor = {
  name: string;
  base: string;
  dark: string;
};

interface CustomizerStore {
  color: ThemeColor;
  leftPanelRef: HTMLDivElement | null;

  setColor: (color: ThemeColor) => void;
  setLeftPanelRef: (ref: HTMLDivElement | null) => void;
}

export const useCustomizerStore = create<CustomizerStore>((set) => ({
  color: {
    name: "gray",
    base: "#6B7280",
    dark: "#374151",
  },

  leftPanelRef: null,

  setColor: (color) => set({ color }),

  setLeftPanelRef: (ref) => set({ leftPanelRef: ref }),
}));
