"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import CaseDetail from "@/components/case/CaseDetail";
import { useCaseDetail } from "@/hooks/useCase";

export default function CaseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { detail, loading } = useCaseDetail(id);

  if (loading) {
    return (
      <EmptyState
        title="Detail Studi Kasus"
        description="Memuat detail studi kasus..."
      />
    );
  }

  if (!detail) {
    return (
      <EmptyState
        title="Detail Studi Kasus"
        description="Studi kasus tidak ditemukan."
        action={
          <Link
            href="/student/case"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            <ArrowLeft size={16} />
            Kembali ke Studi Kasus
          </Link>
        }
      />
    );
  }

  return <CaseDetail detail={detail} />;
}
