"use client";

import PageHeader from "@/components/common/PageHeader";
import MonitoringSummary from "@/components/monitoring/MonitoringSummary";
import { useMonitoring } from "@/hooks/useMonitoring";

export default function TeacherMonitoringPage() {
  const { data, loading } = useMonitoring();

  if (loading) {
    return (
      <div className="space-y-8">
        <PageHeader
          title="Monitoring Kelas"
          description="Pantau perkembangan kompetensi dan performa siswa dalam kelas."
        />
        <div className="flex items-center justify-center py-20 text-description text-sm">
          Memuat data monitoring...
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="space-y-8">
        <PageHeader
          title="Monitoring Kelas"
          description="Pantau perkembangan kompetensi dan performa siswa dalam kelas."
        />
        <div className="flex items-center justify-center py-20 text-description text-sm">
          Tidak ada data kelas yang tersedia.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Monitoring Kelas"
        description="Pantau perkembangan kompetensi dan performa siswa dalam kelas."
      />

      <MonitoringSummary data={data} />
    </div>
  );
}
