import { notFound } from "next/navigation";

import AssessmentDetail from "@/components/profile/AssessmentDetail";

import { monitoringAssessmentDetails } from "@/data/monitoring";

interface Props {
  params: Promise<{
    id: string;
    assessmentId: string;
  }>;
}

export default async function TeacherAssessmentDetailPage({ params }: Props) {
  const { id, assessmentId } = await params;

  const assessment = monitoringAssessmentDetails.find(
    (item) => item.id === assessmentId,
  );

  if (!assessment) {
    notFound();
  }

  return (
    <AssessmentDetail
      id={assessmentId}
      initialDetail={assessment}
      backHref={`/teacher/monitoring/${id}`}
      backLabel="Kembali ke Profil Siswa"
    />
  );
}
