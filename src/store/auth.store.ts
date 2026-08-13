import { create } from "zustand";
import { User } from "@/types/auth";
import { storage } from "@/utils/storage";

interface AuthState {
  token: string | null;
  user: User | null;

  setToken: (token: string) => void;
  setUser: (user: User | null) => void;

  logout: () => void;
  initAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,

  user: null,

  setToken: (token) =>
    set({
      token,
    }),

  setUser: (user) =>
    set({
      user,
    }),

  logout: () =>
    set({
      token: null,
      user: null,
    }),

  initAuth: () => {
    if (typeof window !== "undefined") {
      set({
        token: storage.getToken(),
        user: storage.getUser(),
      });
    }
  },
}));
