"use client";

import Loading from "@/components/common/Loading";
import PageHeader from "@/components/common/PageHeader";

import DashboardSummary from "@/components/dashboard/DashboardSummary";

import { useDashboard } from "@/hooks/useDashboard";

export default function TeacherDashboardPage() {
  const { summary, trend, topicScores, efficiency, loading } = useDashboard();

  if (loading || !summary || !efficiency || !trend) {
    return <Loading open={loading} />;
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