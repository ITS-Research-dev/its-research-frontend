"use client";

import PageHeader from "@/components/common/PageHeader";

import CompetencySection from "@/components/profile/CompetencySection";
import ProfileStats from "@/components/profile/ProfileStats";
import CompetencyTrendChart from "@/components/profile/CompetencyTrendChart";
import LevelTrendChart from "@/components/profile/LevelTrendChart";
import AssessmentHistory from "@/components/profile/AssessmentHistory";

import EmptyState from "@/components/common/EmptyState";

import { useProfileSummary } from "@/hooks/useProfile";

export default function ProfilePage() {
  const { summary, loading } = useProfileSummary();

  if (loading) {
    return (
      <EmptyState
        title="Profil & Riwayat Kemahiran"
        description="Memuat profil..."
      />
    );
  }

  if (!summary) {
    return (
      <EmptyState
        title="Profil & Riwayat Kemahiran"
        description="Data profil tidak tersedia."
      />
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Profil & Riwayat Kemahiran"
        description="Pantau perkembangan kompetensimu dari waktu ke waktu."
      />

      <ProfileStats summary={summary} />

      <CompetencySection
        competencies={summary.competencies}
        totalCase={summary.totalCases}
      />

      <CompetencyTrendChart
        entries={summary.competencyTrend}
        topics={summary.nameMaterials}
      />

      <LevelTrendChart
        entries={summary.levelTrend}
        topics={summary.nameMaterials}
      />

      <AssessmentHistory data={summary.raw} topics={summary.nameMaterials} />
    </div>
  );
}
