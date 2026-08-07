"use client";

import { Loader2 } from "lucide-react";

interface LoadingProps {
  open?: boolean;
  text?: string;
}

export default function Loading({ open, text = "Memuat..." }: LoadingProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999px] flex items-center justify-center bg-black/30 backdrop-blur-lg">
      <div className="rounded-2xl bg-surface px-10 py-8 shadow-xl">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={40} className="animate-spin text-primary" />

          <p className="font-medium text-text">{text}</p>
        </div>
      </div>
    </div>
  );
}
