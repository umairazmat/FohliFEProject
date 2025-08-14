import { create } from "zustand";

type Mode = "light" | "dark";
interface ThemeState {
  mode: Mode;
  toggle: () => void;
}
export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: "light",
  toggle: () => set({ mode: get().mode === "light" ? "dark" : "light" }),
}));
