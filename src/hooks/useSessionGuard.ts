"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/auth.store";
import { storage } from "@/utils/storage";

export function useSessionGuard() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = storage.getToken();
      const refreshToken = storage.getRefreshToken();

      if (!token && !refreshToken) {
        storage.clear()
        useAuthStore.getState().logout();
        router.replace(ROUTES.LOGIN_PAGE);
        return;
      }

      useAuthStore.getState().setUser(storage.getUser());
      useAuthStore.getState().setToken(token);
      useAuthStore.getState().setRefreshToken(refreshToken);
    };

    checkAuth();

    window.addEventListener("pageshow", checkAuth);
    return () => window.removeEventListener("pageshow", checkAuth)
  }, [router]);
}