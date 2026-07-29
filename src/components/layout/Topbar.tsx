"use client";

interface TopbarProps {
  name: string;
  role: "teacher" | "student";
}

export default function Topbar({ name, role }: TopbarProps) {
  return (
    <header className="flex h-18 items-center justify-end border-b border-border bg-surface px-8">
      <div className="flex items-center gap-3">
        {/* User */}
        <div className="text-right">
          <p className="font-semibold text-text">{name}</p>
          <p className="text-sm capitalize text-description">{role}</p>
        </div>
      </div>
    </header>
  );
}
