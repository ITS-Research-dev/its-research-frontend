"use client";

import { Loader2 } from "lucide-react";

export default function TableLoading() {
  return (
    <div className="flex h-60 items-center justify-center rounded-2xl border border-border bg-surface">
      <div className="flex flex-col items-center gap-3">
        <Loader2 size={32} className="animate-spin text-primary" />

        <p className="text-description">Memuat data...</p>
      </div>
    </div>
  );
}
