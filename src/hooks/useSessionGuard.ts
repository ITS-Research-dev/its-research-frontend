"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/auth.store";
import { storage } from "@/utils/storage";

function getTokenExpiration(token: string): number | null {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/")),
    ) as { exp?: number };

    return typeof decoded.exp === "number" ? decoded.exp * 1000 : null;
  } catch {
    return null;
  }
}

export function useSessionGuard() {
  const router = useRouter();

  useEffect(() => {
    const expireSession = () => {
      storage.clear();
      useAuthStore.getState().logout();
      router.replace(ROUTES.LOGIN_PAGE);
    };

    const checkAuth = () => {
      const token = storage.getToken();
      const user = storage.getUser();

      if (!token) {
        expireSession();
        return;
      }

      const expiration = getTokenExpiration(token);
      if (expiration === null || expiration <= Date.now()) {
        expireSession();
        return;
      }

      useAuthStore.getState().setUser(user);
      useAuthStore.getState().setToken(token);
    };

    checkAuth();

    const token = storage.getToken();
    const expiration = token ? getTokenExpiration(token) : null;
    const timeout =
      expiration === null
        ? undefined
        : window.setTimeout(expireSession, Math.max(0, expiration - Date.now()));

    window.addEventListener("pageshow", checkAuth);

    return () => {
      if (timeout !== undefined) window.clearTimeout(timeout);
      window.removeEventListener("pageshow", checkAuth);
    };
  }, [router]);
}