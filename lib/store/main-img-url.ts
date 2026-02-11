import { persist } from "zustand/middleware";
import { create } from "zustand";

interface MainImgUrlState {
  preview: string | null;
  mainImgUrl: File | null;
  setMainImgUrl: (file: File | null) => void;
  clearMainImgUrl: () => void;

  setPreview: (url: string | null) => void;
}

export const useMainImgUrlStore = create<MainImgUrlState>()(
  persist(
    (set) => ({
      preview: null,
      mainImgUrl: null,
      setMainImgUrl: (file: File | null) => set({ mainImgUrl: file }),
      clearMainImgUrl: () => set({ mainImgUrl: null }),

      setPreview: (url: string | null) => set({ preview: url }),
    }),
    {
      name: "main-img-url-storage", // unique name
    }
  )
);
