"use client";

import EmptyState from "@/components/common/EmptyState";
import PageHeader from "@/components/common/PageHeader";

import DashboardSummary from "@/components/dashboard/DashboardSummary";

import { useDashboard } from "@/hooks/useDashboard";

export default function TeacherDashboardPage() {
  const { summary, trend, topicScores, efficiency, loading, selectedClassId } =
    useDashboard();

  if (loading) {
    return (
      <EmptyState title="Dashboard" description="Memuat data dashboard..." />
    );
  }

  if (!summary || !efficiency || !trend || !selectedClassId) {
    return (
      <EmptyState
        title="Dashboard"
        description="Tidak ada data dashboard yang tersedia."
      />
    );
  }
  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Pantau performa pembelajaran, distribusi nilai, dan efisiensi penilaian AI."
      />

      <DashboardSummary
        summary={summary}
        topicScores={topicScores}
        efficiency={efficiency}
        trend={trend}
      />
    </div>
  );
}
