"use client";

import Link from "next/link";
import { ArrowLeft, Code2, Lightbulb } from "lucide-react";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

import EmptyState from "@/components/common/EmptyState";
import { bankData } from "@/data/bank";
import { useBankQuestionDetail } from "@/hooks/useBank";
import { useParams } from "next/navigation";

interface Props {
  backHref?: string;
  backLabel?: string;
}

export default function QuestionDetailPage({
  backHref = "/teacher/bank",
  backLabel = "Kembali ke Bank Soal",
}: Props) {
  const { id } = useParams<{ id: string }>();

  const { question, loading } = useBankQuestionDetail(id);
  if (loading) {
    return (
      <EmptyState
        title="Detail Soal"
        description="Memuat data soal..."
      />
    );
  }

  if (!question) {
    return (
      <EmptyState
        title="Detail Soal"
        description="Soal yang Anda cari tidak tersedia."
        action={
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            <ArrowLeft size={16} />
            {backLabel}
          </Link>
        }
      />
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
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

          <div className="mt-5">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-text">{question.title}</h1>

              <Badge
                variant={question.status === "active" ? "success" : "secondary"}
              >
                {question.status === "active" ? "Aktif" : "Nonaktif"}
              </Badge>
            </div>

            <div className="mt-3">
              <span className="rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {question.topic.title}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Deskripsi */}

      <Card className="p-7">
        <h2 className="mb-4 text-lg font-bold text-text">Deskripsi Soal</h2>

        <p className="whitespace-pre-line text-description">
          {question.description}
        </p>
      </Card>

      {/* Expected Output */}

      <Card className="p-7">
        <h2 className="mb-4 text-lg font-bold text-text">
          Output yang Diharapkan
        </h2>

        <div className="rounded-xl bg-gray-50 p-4">
          <code className="text-sm text-text">{question.expectedOutput}</code>
        </div>
      </Card>

      {/* Hints */}

      <Card className="p-7">
        <div className="mb-5 flex items-center gap-2">
          <Lightbulb size={20} className="text-primary" />

          <h2 className="text-lg font-bold text-text">Hints</h2>
        </div>

        <div className="space-y-4">
          {question.hint1 && (
            <div>
              <p className="text-sm font-semibold text-text">
                Hint 1 — Pseudocode
              </p>

              <p className="mt-1 whitespace-pre-line text-sm text-description">
                {question.hint1}
              </p>
            </div>
          )}

          {question.hint2 && (
            <div>
              <p className="text-sm font-semibold text-text">
                Hint 2 — Cloze Code
              </p>

              <p className="mt-1 whitespace-pre-line text-sm text-description">
                {question.hint2}
              </p>
            </div>
          )}

          {question.hint3 && (
            <div>
              <p className="text-sm font-semibold text-text">
                Hint 3 — Basic Code
              </p>

              <p className="mt-1 whitespace-pre-line text-sm text-description">
                {question.hint3}
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
