import AssessmentDetail from "@/components/profile/AssessmentDetail";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function AssessmentDetailPage({ params }: Props) {
  const { id } = await params;

  return <AssessmentDetail id={id} />;
}
