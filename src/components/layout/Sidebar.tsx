"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { teacherMenu } from "../navigation/teacherMenu";
import { studentMenu } from "../navigation/studentMenu";

interface SidebarProps {
  role: "teacher" | "student";
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const menu = role === "teacher" ? teacherMenu : studentMenu;

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-white">
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold text-blue-600">IAS Research</h1>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                pathname === item.href
                  ? "bg-blue-600 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
