"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Dropdown from "@/components/ui/DropDown";
import ConfirmModal from "@/components/common/ConfirmModal";
import Loading from "@/components/common/Loading";

import { teacherMenu } from "@/components/navigation/teacherMenu";
import { studentMenu } from "@/components/navigation/studentMenu";

import { useAuth } from "@/hooks/useAuth";

interface SidebarProps {
  role: "teacher" | "student";
}

// Dummy data (nanti dari API)
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

  const { logout } = useAuth();

  const [selectedClass, setSelectedClass] = useState(dummyClasses[0].value);

  const [openLogout, setOpenLogout] = useState(false);

  const [loading, setLoading] = useState(false);

  const menu = role === "teacher" ? teacherMenu : studentMenu;

  const mainMenu = menu.filter((item) => item.title !== "Logout");

  const logoutMenu = menu.find((item) => item.title === "Logout");

  const LogoutIcon = logoutMenu?.icon;

  const handleLogout = async () => {
    try {
      setLoading(true);

      // supaya loading terlihat
      await new Promise((resolve) => setTimeout(resolve, 1200));

      await logout();
    } finally {
      setLoading(false);
      setOpenLogout(false);
    }
  };

  return (
    <>
      <aside className="flex h-screen w-72 flex-col border-r border-border bg-surface">
        {/* Logo */}
        <div className="border-b border-border py-6">
          <h1 className="text-center text-3xl font-bold text-primary">Koda</h1>
        </div>

        {/* Dropdown */}
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

        {/* Menu */}
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
                        ? "bg-primary/10 font-semibold text-primary"
                        : "text-text hover:bg-secondary/10"
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
              <button
                type="button"
                onClick={() => setOpenLogout(true)}
                className="
                  flex w-full items-center gap-3
                  rounded-xl
                  px-4 py-3

                  text-danger

                  transition-all duration-200

                  hover:bg-danger/10
                "
              >
                <LogoutIcon size={20} />

                <span>{logoutMenu.title}</span>
              </button>
            </div>
          )}
        </nav>
      </aside>

      {/* Confirm Logout */}
      <ConfirmModal
        open={openLogout}
        title="Keluar dari akun?"
        description="Apakah Anda yakin ingin keluar dari aplikasi Koda?"
        confirmText="Logout"
        cancelText="Batal"
        onClose={() => setOpenLogout(false)}
        onConfirm={async () => {
          setOpenLogout(false);
          setLoading(true);

          try {
            await logout();
          } finally {
            setLoading(false);
          }
        }}
      />

      {/* Loading */}
      <Loading open={loading} text="Sedang keluar..." />
    </>
  );
}
