"use client";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

import { useSessionGuard } from "@/hooks/useSessionGuard";

interface TeacherLayoutProps {
  children: React.ReactNode;
}

export default function TeacherLayout({ children }: TeacherLayoutProps) {
  useSessionGuard();

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
