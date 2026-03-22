import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PopupState {
  hasSeenPopup: boolean;
  lastSeenAt: number | null; // Store timestamp in milliseconds
  setHasSeenPopup: (value: boolean) => void;
  resetPopup: () => void;
}

export const usePopupStore = create<PopupState>()(
  persist(
    (set) => ({
      hasSeenPopup: false,
      lastSeenAt: null,
      setHasSeenPopup: (value) =>
        set({
          hasSeenPopup: value,
          lastSeenAt: value ? Date.now() : null,
        }),
      resetPopup: () => set({ hasSeenPopup: false, lastSeenAt: null }),
    }),
    {
      name: "popup-storage",
    }
  )
);
