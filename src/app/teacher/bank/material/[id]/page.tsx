"use client";

import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import MarkdownRenderer from "@/components/bank/MarkdownRenderer";

import Loading from "@/components/common/Loading";
import { useBankMateriDetail } from "@/hooks/useBank";
import { useParams } from "next/navigation";

interface Props {
  backHref?: string;
  backLabel?: string;
}

export default function MaterialDetailPage({
  backHref = "/teacher/bank",
  backLabel = "Kembali ke Bank Materi",
}: Props) {
  const { id } = useParams<{ id: string }>();
  const { material, loading } = useBankMateriDetail(id);
  if (loading) return <Loading open={true} text="Memuat materi..." />;
  if (!material) {
    return (
      <div className="space-y-6">
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

        <Card className="p-8 text-center">
          <h2 className="text-lg font-semibold text-text">
            Materi tidak ditemukan
          </h2>

          <p className="mt-2 text-description">
            Materi yang Anda cari tidak tersedia.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-4">
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
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-text">{material.title}</h1>

              <Badge
                variant={material.status === "active" ? "success" : "secondary"}
              >
                {material.status === "active" ? "Aktif" : "Nonaktif"}
              </Badge>
            </div>

            <p className="mt-2 max-w-3xl text-description">
              {material.description}
            </p>
          </div>
        </div>
      </div>

      {/* ================= INFORMATION ================= */}

      <Card className="p-5">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <div>
            <p className="text-xs font-medium text-description">Status</p>

            <div className="mt-1">
              <Badge
                variant={material.status === "active" ? "success" : "secondary"}
              >
                {material.status === "active" ? "Aktif" : "Tidak Aktif"}
              </Badge>
            </div>
          </div>

          <div className="h-8 w-px bg-border" />

          <div>
            <p className="text-xs font-medium text-description">
              Tanggal Mulai
            </p>

            <div className="mt-1 flex items-center gap-2 text-sm font-medium text-text">
              <CalendarDays size={16} className="text-primary" />

              {material.startDate || "-"}
            </div>
          </div>
        </div>
      </Card>

      {/* ================= CONTENT ================= */}

      <Card className="overflow-hidden">
        {/* Content Header */}

        <div className="border-b border-border bg-gray-50 px-7 py-5">
          <h2 className="text-lg font-bold text-text">Konten Materi</h2>

          <p className="mt-1 text-sm text-description">
            Materi pembelajaran yang dapat dipelajari oleh siswa.
          </p>
        </div>

        {/* Markdown Content */}

        <div className="px-7 py-8 sm:px-10 sm:py-10">
          <MarkdownRenderer content={material.content} />
        </div>
      </Card>
    </div>
  );
}
