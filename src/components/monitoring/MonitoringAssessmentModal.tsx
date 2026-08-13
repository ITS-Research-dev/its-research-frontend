"use client";

import { ProfileResponse } from "@/types/profile";

interface Props {
  open: boolean;
  data?: ProfileResponse;
  studentName: string;
  className?: string;
  onClose: () => void;
}

const DIMENSION_LABELS: Record<string, string> = {
  logika: "Logika",
  fungsionalitas: "Fungsionalitas",
  syntax: "Sintaks",
  dokumentasi: "Dokumentasi",
  code_style: "Gaya",
  konsep: "Konsep",
};

/** Compute AI accuracy as percentage match between aiScore and teacherScore */
function computeAiAccuracy(
  aiScore: ProfileResponse["aiScore"],
  teacherScore: ProfileResponse["teacherScore"],
): number {
  const keys = Object.keys(DIMENSION_LABELS);

  const totalDiff = keys.reduce((sum, key) => {
    const diff = Math.abs(
      (aiScore as Record<string, number>)[key as string] -
      (teacherScore as Record<string, number>)[key as string],
    );
    return sum + diff;
  }, 0);

  const maxPossibleDiff = keys.length * 100;
  const accuracy = Math.round((1 - totalDiff / maxPossibleDiff) * 100);
  return Math.max(0, accuracy);
}

export default function MonitoringAssessmentModal({
  open,
  data,
  studentName,
  className,
  onClose,
}: Props) {
  if (!open || !data) return null;

  const aiScore = data.aiScore;
  const teacherScore = data.teacherScore;
  const aiAccuracy = computeAiAccuracy(aiScore, teacherScore);

  const finalScores = Object.keys(DIMENSION_LABELS).map((key) => ({
    key,
    label: DIMENSION_LABELS[key],
    value: (teacherScore as unknown as Record<string, number>)[key] ?? 0,
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[95vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-surface shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between px-7 pt-7">
          <div>
            {className && (
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {className}
              </p>
            )}

            <h2 className="mt-2 text-2xl font-bold text-text">
              {studentName} · {data.test.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-5xl font-medium text-text transition hover:text-primary"
          >
            x
          </button>
        </div>

        <div className="px-7 pb-7 pt-8">
          {/* AI Accuracy & Status */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-description">
                Akurasi AI
              </p>

              <p className="mt-1 text-4xl font-bold text-success">
                {aiAccuracy}%
              </p>
            </div>

            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-description">
                Status
              </p>

              <p className="mt-1 text-2xl font-bold text-text">{data.level}</p>
            </div>
          </div>

          {/* Description */}
          <p className="mt-8 text-sm leading-relaxed text-description">
            Persentase akurasi menunjukkan seberapa dekat skor akhir guru dengan
            draf skor AI — semakin tinggi, semakin besar AI membantu proses
            asesmen.
          </p>

          {/* Skor Final */}
          <section className="mt-7">
            <h3 className="mb-4 text-base font-semibold text-text">
              Skor Final
            </h3>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {finalScores.map(({ key, label, value }) => (
                <div
                  key={key}
                  className="rounded-xl border border-border p-5 text-center"
                >
                  <p className="text-3xl font-bold text-text">{value}</p>

                  <p className="mt-1 text-sm text-description">{label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Catatan dari AI */}
          <section className="mt-7">
            <h3 className="mb-3 text-base font-semibold text-text">
              Catatan dari AI
            </h3>

            <p className="text-sm leading-relaxed text-text">
              {data.aiSuggestion || "-"}
            </p>
          </section>

          {/* Catatan Guru */}
          <section className="mt-7">
            <h3 className="mb-3 text-base font-semibold text-text">
              Catatan Guru
            </h3>

            {data.flagOverride ? (
              <p className="text-sm leading-relaxed text-text">
                {data.teacherSuggestion || "-"}
              </p>
            ) : (
              <p className="text-sm italic text-description">Belum diverifikasi oleh guru.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
