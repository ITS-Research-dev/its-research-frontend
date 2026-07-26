import Sidebar from "@/components/layout/Sidebar";

interface StudentLayoutProps {
  children: React.ReactNode;
}

export default function StudentLayout({ children }: StudentLayoutProps) {
  return (
    <div className="flex h-screen">
      <Sidebar role="student" />

      <div className="flex flex-1 flex-col">
        <main className="flex-1 overflow-y-auto bg-slate-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
