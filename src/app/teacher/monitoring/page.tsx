"use client";

import PageHeader from "@/components/common/PageHeader";

import MonitoringSummary from "@/components/monitoring/MonitoringSummary";

import { monitoringData } from "@/data/monitoring";

export default function TeacherMonitoringPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Monitoring Kelas"
        description="Pantau perkembangan kompetensi dan performa siswa dalam kelas."
      />

      <MonitoringSummary data={monitoringData} />
    </div>
  );
}
