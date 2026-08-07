import {
  LayoutDashboard,
  BookOpen,
  FileCode,
  History,
  User,
  LogOut,
} from "lucide-react";

export const studentMenu = [
  // {
  //   title: "Dashboard",
  //   href: "/student",
  //   icon: LayoutDashboard,
  // },
  {
    title: "Materi Belajar",
    href: "/student/materials",
    icon: BookOpen,
  },
  {
    title: "Studi Kasus",
    href: "/student/case",
    icon: FileCode,
  },
  {
    title: "Profil & Riwayat",
    href: "/student/profile",
    icon: User,
  },
  {
    title: "Logout",
    href: "/auth/login",
    icon: LogOut,
  },
];
