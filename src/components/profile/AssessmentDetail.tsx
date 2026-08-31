"use client";

import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Loading from "@/components/common/Loading";

import AssessmentSummary from "./AssessmentSummary";
import FeedbackCard from "./FeedbackCard";
import CompetencySection from "./CompetencySection";

import { useAssessmentDetail } from "@/hooks/useAssessment";
import { AssessmentDetail as AssessmentDetailType } from "@/types/asessment";

interface Props {
  id: string;

  /**
   * Digunakan ketika halaman ingin memberikan
   * data secara langsung, misalnya data dummy.
   */
  initialDetail?: AssessmentDetailType;

  backHref?: string;
  backLabel?: string;
}

function levelVariant(level: string) {
  switch (level) {
    case "Proficient":
      return "success";

    case "Expert":
      return "success";

    case "Competent":
      return "primary";

    case "Advance":
      return "primary";

    case "Advance/Beginner":
      return "primary";

    case "Beginner":
      return "warning";

    case "Novice":
      return "danger";

    default:
      return "danger";
  }
}

export default function AssessmentDetail({
  id,
  initialDetail,
  backHref = "/student/profile",
  backLabel = "Kembali ke Profil",
}: Props) {
  const { detail: apiDetail, loading } = useAssessmentDetail(
    id,
    !initialDetail,
  );

  const detail = initialDetail ?? apiDetail;

  if (!initialDetail && loading) {
    return <Loading open={true} text="Memuat detail asesmen..." />;
  }

  if (!detail) {
    return (
      <Card className="flex flex-col items-center justify-center gap-4 p-16 text-center">
        <h2 className="text-xl font-semibold text-text">
          Data Tidak Ditemukan
        </h2>
        <p className="text-description text-md">
          Detail asesmen tidak tersedia atau belum diproses.
        </p>
        <Link
          href={backHref}
          className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          <ArrowLeft size={16} />
          {backLabel}
        </Link>
      </Card>
    );
  }

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

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
          {detail.topic}
        </p>

        <h1 className="mt-2 text-2xl font-bold text-text">{detail.title}</h1>

        <div className="mt-5">
          <Badge variant={levelVariant(detail.level)}>{detail.level}</Badge>
        </div>
      </div>

      <AssessmentSummary detail={detail} />

      <FeedbackCard feedback={detail.feedback} />

      <CompetencySection competencies={detail.competencies} totalCase={1} />
    </div>
  );
}
