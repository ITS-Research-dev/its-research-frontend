"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import AssessmentDetail from "@/components/profile/AssessmentDetail";
import { useMonitoringAssessment } from "@/hooks/useMonitoringAssessment";

interface Props {
  params: Promise<{
    id: string;
    assessmentId: string;
  }>;
}

export default function TeacherAssessmentDetailPage({ params }: Props) {
  const { id, assessmentId } = use(params);

  const { detail, loading } = useMonitoringAssessment(id, assessmentId);

  if (loading) {
    return (
      <EmptyState
        title="Detail Asesmen"
        description="Memuat detail asesmen..."
      />
    );
  }

  if (!detail) {
    return (
      <EmptyState
        title="Detail Asesmen"
        description="Data asesmen tidak ditemukan."
        action={
          <Link
            href={`/teacher/monitoring/${id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            <ArrowLeft size={16} />
            Kembali ke Profil Siswa
          </Link>
        }
      />
    );
  }

  return (
    <AssessmentDetail
      id={assessmentId}
      initialDetail={detail}
      backHref={`/teacher/monitoring/${id}`}
      backLabel="Kembali ke Profil Siswa"
    />
  );
}
