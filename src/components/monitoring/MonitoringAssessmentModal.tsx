"use client";

import Modal from "@/components/ui/Modal";

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

/**
 * Menghitung akurasi AI berdasarkan perbedaan
 * antara skor AI dan skor akhir guru.
 */
function computeAiAccuracy(
  aiScore: ProfileResponse["aiScore"],
  teacherScore: ProfileResponse["teacherScore"],
): number {
  const keys = Object.keys(DIMENSION_LABELS);

  const totalDiff = keys.reduce((sum, key) => {
    const diff = Math.abs(
      ((aiScore as Record<string, number>)[key] ?? 0) -
        ((teacherScore as Record<string, number>)[key] ?? 0),
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
  if (!data) return null;

  const aiScore = data.aiScore;
  const teacherScore = data.teacherScore;

  const aiAccuracy = computeAiAccuracy(aiScore, teacherScore);

  /**
   * Menggunakan skor guru sebagai skor final.
   * Jika belum ada perubahan dari guru,
   * teacherScore tetap berisi skor yang digunakan sistem.
   */
  const finalScores = Object.keys(DIMENSION_LABELS).map((key) => ({
    key,
    label: DIMENSION_LABELS[key],
    value: (teacherScore as Record<string, number>)[key] ?? 0,
  }));

  /**
   * Catatan hanya satu.
   *
   * Prioritas:
   * 1. teacherSuggestion jika guru sudah melakukan override
   * 2. aiSuggestion sebagai catatan awal dari AI
   */
  const note =
    data.flagOverride && data.teacherSuggestion
      ? data.teacherSuggestion
      : data.aiSuggestion || "-";

  return (
    <Modal open={open} onClose={onClose} size="xl">
      <div className="px-1">
        {/* Header */}
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

        {/* AI Accuracy & Status */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
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
          Persentase akurasi menunjukkan seberapa dekat skor akhir dengan
          rekomendasi skor dari AI.
        </p>

        {/* Skor Final */}
        <section className="mt-7">
          <h3 className="mb-4 text-base font-semibold text-text">Skor Final</h3>

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

        {/* Catatan */}
        <section className="mt-7">
          <h3 className="mb-3 text-base font-semibold text-text">Catatan</h3>

          <div className="rounded-xl border border-border bg-background p-4">
            <p className="text-sm leading-relaxed text-text">{note}</p>
          </div>
        </section>
      </div>
    </Modal>
  );
}
