"use client";

import { notFound, useParams } from "next/navigation";

import Loading from "@/components/common/Loading";
import CaseDetail from "@/components/case/CaseDetail";
import { useCaseDetail } from "@/hooks/useCase";

export default function CaseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { detail, loading } = useCaseDetail(id);

  if (loading) {
    return <Loading open text="Memuat studi kasus..." />;
  }

  if (!detail) {
    notFound();
  }

  return <CaseDetail detail={detail} />;
}
