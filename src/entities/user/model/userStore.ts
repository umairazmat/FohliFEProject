import { create } from "zustand";
import type { User } from "../types";

interface State {
  users: User[];
  setUsers: (list: User[]) => void;
  upsertUser: (u: User) => void;
  removeUser: (id: string) => void;

  formOpen: boolean;
  editingUser?: User | null;
  openForCreate: () => void;
  openForEdit: (u: User) => void;
  closeForm: () => void;
}

export const useUserStore = create<State>((set) => ({
  users: [],
  setUsers: (list) => set({ users: list }),
  upsertUser: (u) =>
    set((s) => ({
      users: s.users.some((x) => x.id === u.id)
        ? s.users.map((x) => (x.id === u.id ? u : x))
        : [u, ...s.users],
    })),
  removeUser: (id) =>
    set((s) => ({ users: s.users.filter((u) => u.id !== id) })),

  formOpen: false,
  editingUser: null,
  openForCreate: () => set({ formOpen: true, editingUser: null }),
  openForEdit: (u) => set({ formOpen: true, editingUser: u }),
  closeForm: () => set({ formOpen: false, editingUser: null }),
}));
