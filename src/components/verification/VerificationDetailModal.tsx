"use client";

import Badge from "@/components/ui/Badge";

import { VerificationDetail } from "@/types/verification";

interface Props {
  open: boolean;
  data?: VerificationDetail;
  onClose: () => void;
}

export default function VerificationDetailModal({
  open,
  data,
  onClose,
}: Props) {
  if (!open || !data) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[95vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-surface shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between px-7 pt-7">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              XI RPL 2
            </p>

            <h2 className="mt-2 text-2xl font-bold text-text">
              {data.studentName} · {data.questionTitle}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-5xl font-medium text-text transition hover:text-primary"
          >
            ×
          </button>
        </div>

        <div className="px-7 pb-7 pt-8">
          {/* AI Accuracy */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="text-center">
              <p className="text-xs uppercase text-description">Akurasi AI</p>

              <p className="mt-1 text-4xl font-bold text-success">
                {data.aiAccuracy}%
              </p>
            </div>

            <div className="text-center">
              <p className="text-xs uppercase text-description">Status</p>

              <p className="mt-1 text-2xl font-bold text-text">{data.status}</p>
            </div>
          </div>

          {/* Description */}
          <p className="mt-8 text-sm leading-relaxed text-description">
            Persentase akurasi menunjukkan seberapa dekat skor akhir guru dengan
            draf skor AI — semakin tinggi, semakin besar AI membantu proses
            asesmen.
          </p>

          {/* Final Score */}
          <section className="mt-7">
            <h3 className="mb-4 text-base font-semibold text-text">
              Skor Final
            </h3>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {data.finalScores.map((score) => (
                <div
                  key={score.name}
                  className="rounded-xl border border-border p-5 text-center"
                >
                  <p className="text-3xl font-bold text-text">
                    {score.teacherScore}
                  </p>

                  <p className="mt-1 text-sm text-description">{score.name}</p>
                </div>
              ))}
            </div>
          </section>

          {/* AI Note */}
          <section className="mt-7">
            <h3 className="mb-3 text-base font-semibold text-text">
              Catatan dari AI
            </h3>

            <p className="text-sm leading-relaxed text-text">{data.aiNote}</p>
          </section>

          {/* Teacher Note */}
          <section className="mt-7">
            <h3 className="mb-3 text-base font-semibold text-text">
              Catatan Guru
            </h3>

            <p className="text-sm leading-relaxed text-text">
              {data.teacherNote || "-"}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
