import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar role="student" />

      <div className="flex flex-1 flex-col">
        <Topbar name="Andi Pratama" role="student" />

        <main className="flex-1 overflow-auto p-8">{children}</main>
      </div>
    </div>
  );
}
