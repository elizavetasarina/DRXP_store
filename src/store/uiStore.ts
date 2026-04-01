import { create } from "zustand";

export type CursorVariant = "default" | "hover" | "text";

interface UIState {
  isMenuOpen: boolean;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  cursorVariant: CursorVariant;

  toggleMenu: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleSearch: () => void;
  setCursorVariant: (variant: CursorVariant) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  isMenuOpen: false,
  isCartOpen: false,
  isSearchOpen: false,
  cursorVariant: "default",

  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
}));
