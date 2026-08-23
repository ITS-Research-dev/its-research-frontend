"use client";

import Modal from "@/components/ui/Modal";
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
  if (!data) {
    return null;
  }

  return (
    <Modal open={open} onClose={onClose} size="xl">
      <div className="px-1">
        {/* Header Informasi */}
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            XI RPL 2
          </p>

          <h2 className="mt-2 text-2xl font-bold text-text">
            {data.studentName} · {data.questionTitle}
          </h2>
        </div>

        {/* AI Accuracy & Status */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
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
          <h3 className="mb-4 text-base font-semibold text-text">Skor Final</h3>

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

        {/* Catatan */}
        <section className="mt-7">
          <h3 className="mb-3 text-base font-semibold text-text">Catatan</h3>

          <p className="text-sm leading-relaxed text-text">
            {data.aiNote || "-"}
          </p>
        </section>
      </div>
    </Modal>
  );
}
