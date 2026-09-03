"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Dropdown from "@/components/ui/DropDown";
import ConfirmModal from "@/components/common/ConfirmModal";
import Loading from "@/components/common/Loading";

import { teacherMenu } from "@/components/navigation/teacherMenu";
import { studentMenu } from "@/components/navigation/studentMenu";

import { useAuth } from "@/hooks/useAuth";
import { useClassStore } from "@/store/class.store";
import { DropdownItem } from "../common/DataTable";
import { storage } from "@/utils/storage";
import api from "@/lib/api";


interface SidebarProps {
  role: "teacher" | "student";
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const { logout } = useAuth();

  const [openLogout, setOpenLogout] = useState(false);

  const [loading, setLoading] = useState(false);

  const [classes, setClasses] = useState<DropdownItem[]>([]);

  const menu = role === "teacher" ? teacherMenu : studentMenu;

  const mainMenu = menu.filter((item) => item.title !== "Logout");

  const logoutMenu = menu.find((item) => item.title === "Logout");

  const LogoutIcon = logoutMenu?.icon;

  const { selectedClassId, setSelectedClassId } = useClassStore();

  const handleLogout = async () => {
    setOpenLogout(false);
    setLoading(true);
    try {
      await logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const initialList = storage.getClass();
    if (initialList.length > 0) {
      setClasses(initialList);
    }

    if (role === "teacher") {
      api
        .get("/class")
        .then((res) => {
          if (!isMounted || !Array.isArray(res.data)) return;
          const all = res.data.map((c: any) => ({
            value: c.id,
            label: c.title,
          }));
          if (all.length > 0) {
            setClasses(all);
            const exists = all.some(
              (item: any) => item.value === selectedClassId,
            );
            if (!selectedClassId || !exists) {
              setSelectedClassId(all[0].value);
            }
          }
        })
        .catch(() => {
          if (initialList.length > 0) {
            const exists = initialList.some(
              (item) => item.value === selectedClassId,
            );
            if (!selectedClassId || !exists) {
              setSelectedClassId(initialList[0].value);
            }
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, [role]);


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
            value={selectedClassId}
            onChange={setSelectedClassId}
            items={classes}
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
        onConfirm={() => handleLogout()}
      />

      {/* Loading */}
      <Loading open={loading} text="Sedang keluar..." />
    </>
  );
}
