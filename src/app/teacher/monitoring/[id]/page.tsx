import { notFound } from "next/navigation";
import PageHeader from "@/components/common/PageHeader";
import TopicScoreDistribution from "@/components/dashboard/TopicScoreDistribution";
import ProfileStats from "@/components/profile/ProfileStats";
import CompetencySection from "@/components/profile/CompetencySection";
import CompetencyTrendChart from "@/components/profile/CompetencyTrendChart";
import LevelTrendChart from "@/components/profile/LevelTrendChart";
import AssessmentHistory from "@/components/profile/AssessmentHistory";
import { monitoringStudentDetails } from "@/data/monitoring";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{
    id: string;
  }>;
  backHref?: string;
  backLabel?: string;
}

export default async function TeacherMonitoringStudentPage({
  params,
  backHref = "/teacher/monitoring",
  backLabel = "Kembali ke Monitoring Kelas",
}: Props) {
  const { id } = await params;

  const student = monitoringStudentDetails.find((item) => item.id === id);

  if (!student) {
    notFound();
  }

  const profile = student.profile;

  const topics = student.topicScores.map((item) => item.topic);

  return (
    <div className="space-y-8">
      <Link
        href={backHref}
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

        {backLabel}
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
        detailBaseHref={`/teacher/monitoring/${student.id}/assessment`}
      />
    </div>
  );
}
