"use client";

import { Users, Trophy } from "lucide-react";
import { MonitoringSummary } from "@/types/monitoring";

import StatsCard from "@/components/profile/StatCard";

interface Props {
  summary: MonitoringSummary;
}

export default function MonitoringStats({ summary }: Props) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <StatsCard
        title="Rata-rata Nilai Kelas"
        value={summary.averageScore}
        // description="Rata-rata nilai seluruh siswa"
        icon={Trophy}
      />

      <StatsCard
        title="Jumlah Siswa"
        value={summary.totalStudents}
        // description="Total siswa dalam kelas"
        icon={Users}
      />
    </div>
  );
}
