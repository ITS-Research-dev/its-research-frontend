"use client";

import { useAuthStore } from "@/store/auth.store";

export default function Topbar() {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="flex h-18 items-center justify-end border-b border-border bg-surface px-8">
      <div className="flex items-center gap-3">
        {/* User */}
        <div className="text-right">
          <p className="font-semibold text-text">{user?.name}</p>
          <p className="text-sm capitalize text-description">{user?.role}</p>
        </div>
      </div>
    </header>
  );
}
