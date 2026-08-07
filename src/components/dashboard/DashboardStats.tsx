"use client";

import { Users, BrainCircuit, Clock3 } from "lucide-react";

import StatCard from "@/components/profile/StatCard";

import { TeacherDashboardSummary } from "@/types/dashboard";

interface Props {
  summary: TeacherDashboardSummary;
}

export default function DashboardStats({ summary }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <StatCard
        title="Total Siswa"
        value={summary.totalStudents}
        icon={Users}
        iconColor="text-primary"
        iconBackground="bg-primary/10"
      />

      <StatCard
        title="Rata-rata Nilai"
        value={summary.averageScore}
        icon={BrainCircuit}
        iconColor="text-success"
        iconBackground="bg-success/10"
      />

      <StatCard
        title="Rata-rata Penilaian AI"
        value={summary.averageAssessmentTime}
        icon={Clock3}
        iconColor="text-warning"
        iconBackground="bg-warning/10"
      />
    </div>
  );
}
