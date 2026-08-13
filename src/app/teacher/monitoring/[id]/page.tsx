"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import PageHeader from "@/components/common/PageHeader";
import TopicScoreDistribution from "@/components/dashboard/TopicScoreDistribution";
import ProfileStats from "@/components/profile/ProfileStats";
import CompetencySection from "@/components/profile/CompetencySection";
import CompetencyTrendChart from "@/components/profile/CompetencyTrendChart";
import LevelTrendChart from "@/components/profile/LevelTrendChart";
import AssessmentHistory from "@/components/profile/AssessmentHistory";
import MonitoringAssessmentModal from "@/components/monitoring/MonitoringAssessmentModal";

import { useMonitoringStudent } from "@/hooks/useMonitoring";
import { ProfileResponse } from "@/types/profile";

interface Props {
  params: Promise<{ id: string }>;
}

export default function TeacherMonitoringStudentPage({ params }: Props) {
  const { id } = use(params);

  const { student, loading } = useMonitoringStudent(id);

  const [selectedAssessment, setSelectedAssessment] =
    useState<ProfileResponse | null>(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-description text-sm">
        Memuat data siswa...
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex items-center justify-center py-20 text-description text-sm">
        Data siswa tidak ditemukan.
      </div>
    );
  }

  const profile = student.profile;

  console.log(`STUDENT PROFILE:`)
  console.log({profile})

  const topics = student.topicScores.map((item) => item.topic);

  return (
    <>
      <div className="space-y-8">
        <Link
          href="/teacher/monitoring"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-primary
            transition-colors
            hover:text-primary/80
          "
        >
          <ArrowLeft size={18} />
          Kembali ke Monitoring Kelas
        </Link>

        <PageHeader
          title={`Profil ${student.name}`}
          description={`Pantau perkembangan kompetensi dan riwayat asesmen ${student.name}.`}
        />

        <ProfileStats summary={profile} />

        <CompetencySection
          competencies={profile.competencies}
          totalCase={profile.totalCases}
        />

        <TopicScoreDistribution data={student.topicScores} />

        <CompetencyTrendChart entries={profile.competencyTrend} topics={topics} />

        <LevelTrendChart entries={profile.levelTrend} topics={topics} />

        <AssessmentHistory
          data={profile.raw}
          topics={topics}
          onDetail={(item) => setSelectedAssessment(item)}
        />
      </div>

      <MonitoringAssessmentModal
        open={selectedAssessment !== null}
        data={selectedAssessment ?? undefined}
        studentName={student.name}
        className={student.className}
        onClose={() => setSelectedAssessment(null)}
      />
    </>
  );
}
