import {
  LayoutDashboard,
  BookOpen,
  ClipboardCheck,
  Monitor,
  LogOut,
} from "lucide-react";

export const teacherMenu = [
  {
    title: "Dashboard",
    href: "/teacher",
    icon: LayoutDashboard,
  },
  {
    title: "Bank Materi",
    href: "/teacher/materials",
    icon: BookOpen,
  },
  {
    title: "Verifikasi Nilai",
    href: "/teacher/verification",
    icon: ClipboardCheck,
  },
  {
    title: "Monitoring Kelas",
    href: "/teacher/monitoring",
    icon: Monitor,
  },
  {
    title: "Logout",
    href: "/auth/login",
    icon: LogOut,
  },
];
