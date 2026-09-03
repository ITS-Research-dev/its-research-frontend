"use client";

import { useParams, useRouter } from "next/navigation";

import { materials } from "@/data/materials";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MaterialHeader from "@/components/material/MaterialHeader";
import MaterialContent from "@/components/material/MaterialContent";
import MaterialFooter from "@/components/material/MaterialFooter";
import SummaryCard from "@/components/material/SummaryCard";
import CodeBlock from "@/components/material/CodeBlock";
import { useMaterialDetail } from "@/hooks/useMaterial";
import EmptyState from "@/components/common/EmptyState";
import MarkdownContent from "@/components/material/MarkdownContent";

export default function MaterialDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { material, loading } = useMaterialDetail(id);
  const router = useRouter();

  if (loading) {
    return (
      <EmptyState
        title="Detail Materi"
        description="Memuat materi..."
      />
    );
  }

  if (!material) {
    return (
      <EmptyState
        title="Detail Materi"
        description="Materi tidak ditemukan."
        action={
          <Link
            href="/student/materials"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            <ArrowLeft size={16} />
            Kembali ke Materi
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-8">
      <Link
        href="/student/materials"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
      >
        <ArrowLeft size={18} />
        Kembali ke Materi
      </Link>

      <MaterialHeader
        title={material.title}
        description={material.description}
      />

      <MaterialContent>
        <MarkdownContent content={material.subject}></MarkdownContent>

        <MaterialFooter onNext={() => router.push(`/student/case/${id}`)} />
      </MaterialContent>
    </div>
  );
}
