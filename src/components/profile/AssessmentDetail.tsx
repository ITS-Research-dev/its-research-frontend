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

interface Props {
  id: string;
}

function levelVariant(level: string) {
  switch (level) {
    case "Proficient":
      return "success";

    case "Competent":
      return "primary";

    case "Beginner":
      return "warning";

    default:
      return "danger";
  }
}

export default function AssessmentDetail({ id }: Props) {
  const { detail, loading } = useAssessmentDetail(id);

  if (loading) {
    return <Loading open={true} text="Memuat detail asesmen..." />;
  }

  if (!detail) {
    return (
      <Card className="p-10 text-center">
        <h2 className="text-xl font-bold text-text">Data tidak ditemukan</h2>

        <p className="mt-3 text-description">Detail asesmen tidak tersedia.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <Link
        href="/student/profile"
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
        Kembali ke Profil
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

      <CompetencySection competencies={detail.competencies} />
    </div>
  );
}
