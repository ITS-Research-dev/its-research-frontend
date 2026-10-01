import { create } from "zustand";
import { User } from "@/types/auth";
import { storage } from "@/utils/storage";

interface AuthState {
  token: string | null;
  user: User | null;
  refreshToken: string | null;

  setToken: (token: string | null) => void;
  setRefreshToken: (refreshToken: string | null) => void;
  setUser: (user: User | null) => void;

  logout: () => void;
  initAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  refreshToken: null,
  user: null,

  setToken: (token) =>
    set({
      token,
    }),

  setRefreshToken: (refreshToken) =>
    set({
      refreshToken,
    }),

  setUser: (user) =>
    set({
      user,
    }),

  logout: () =>
    set({
      token: null,
      refreshToken: null,
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
