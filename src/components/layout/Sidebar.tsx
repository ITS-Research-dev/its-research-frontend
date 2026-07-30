"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Dropdown from "../ui/DropDown";
import { teacherMenu } from "../navigation/teacherMenu";
import { studentMenu } from "../navigation/studentMenu";

interface SidebarProps {
  role: "teacher" | "student";
}

// Dummy data (nanti diganti dari API GET /assigned_class)
const dummyClasses = [
  {
    label: "XII RPL 1",
    value: "1",
  },
  {
    label: "XII RPL 2",
    value: "2",
  },
  {
    label: "XII RPL 3",
    value: "3",
  },
];

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const menu = role === "teacher" ? teacherMenu : studentMenu;

  const [selectedClass, setSelectedClass] = useState(dummyClasses[0].value);

  // Pisahkan menu utama dan logout
  const mainMenu = menu.filter((item) => item.title !== "Logout");

  const logoutMenu = menu.find((item) => item.title === "Logout");

  const LogoutIcon = logoutMenu?.icon;

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-border bg-surface">
      {/* Logo */}
      <div className="border-b border-border py-6">
        <h1 className="text-center text-3xl font-bold text-primary">Koda</h1>
      </div>

      {/* Dropdown Kelas */}
      {role === "teacher" && (
        <div className="border-b border-border p-4">
          <Dropdown
            label="Pilih Kelas"
            placeholder="Pilih kelas"
            value={selectedClass}
            onChange={setSelectedClass}
            items={dummyClasses}
          />
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {mainMenu.map((item) => {
            const Icon = item.icon;

            const active = pathname === item.href;

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`
                  flex items-center gap-3
                  rounded-xl
                  px-4 py-3

                  transition-all duration-200

                  ${
                    active
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-text hover:bg-secondary/10 hover:text-text"
                  }
                `}
              >
                <Icon size={20} />

                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>

        {/* Logout */}
        {logoutMenu && LogoutIcon && (
          <div className="mt-5 border-t border-border pt-5">
            <Link
              href={logoutMenu.href}
              className="
                flex items-center gap-3
                rounded-xl
                px-4 py-3

                text-danger

                transition-all duration-200

                hover:bg-danger/10
              "
            >
              <LogoutIcon size={20} />

              <span>{logoutMenu.title}</span>
            </Link>
          </div>
        )}
      </nav>
    </aside>
  );
}
