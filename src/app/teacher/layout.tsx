"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

import { storage } from "@/utils/storage";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/auth.store";

interface TeacherLayoutProps {
  children: React.ReactNode;
}

export default function TeacherLayout({ children }: TeacherLayoutProps) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = storage.getToken();
      const user = storage.getUser();

      if (!token) {
        router.replace(ROUTES.LOGIN_PAGE);
      } else {
        useAuthStore.getState().setUser(user);
        useAuthStore.getState().setToken(token);
      }
    };

    checkAuth();

    window.addEventListener("pageshow", checkAuth);

    return () => {
      window.removeEventListener("pageshow", checkAuth);
    };
  }, [router]);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar role="teacher" />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 overflow-auto p-8">{children}</main>
      </div>
    </div>
  );
}
