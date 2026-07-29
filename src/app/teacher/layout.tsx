import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar role="teacher" />

      <div className="flex flex-1 flex-col">
        <Topbar name="Budi Santoso, S.Pd." role="teacher" />

        <main className="flex-1 overflow-auto p-8">{children}</main>
      </div>
    </div>
  );
}
