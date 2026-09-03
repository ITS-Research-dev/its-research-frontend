"use client";

import EmptyState from "@/components/common/EmptyState";
import PageHeader from "@/components/common/PageHeader";
import MonitoringSummary from "@/components/monitoring/MonitoringSummary";
import { useMonitoring } from "@/hooks/useMonitoring";

export default function TeacherMonitoringPage() {
  const { data, loading } = useMonitoring();

  if (loading) {
    return (
      <EmptyState
        title="Monitoring Kelas"
        description="Memuat data monitoring..."
      />
    );
  }

  if (!data) {
    return (
      <EmptyState
        title="Monitoring Kelas"
        description="Tidak ada data kelas yang tersedia."
      />
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
