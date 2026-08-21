"use client";

import { useEffect, useState } from "react";

import Modal from "@/components/ui/Modal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";

import { VerificationItem } from "@/types/verification";
import ConfirmModal from "../common/ConfirmModal";

interface Props {
  open: boolean;
  data?: VerificationItem;
  onClose: () => void;

  onSave?: (
    id: string,
    scores: Record<string, number>,
    teacherNote: string,
    decision: "terima" | "koreksi",
  ) => void;
}

type ConfirmAction = "save" | "accept-ai" | null;

export default function ReviewModal({ open, data, onClose, onSave }: Props) {
  const [scores, setScores] = useState<Record<string, number>>({});
  const [teacherNote, setTeacherNote] = useState("");
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  // =========================
  // INITIAL DATA
  // =========================

  useEffect(() => {
    if (!open || !data) return;

    const initialScores: Record<string, number> = {};

    data.dimensions.forEach((dimension) => {
      initialScores[dimension.name] = dimension.teacherScore;
    });

    setScores(initialScores);
    setTeacherNote(data.teacherNote ?? "");
  }, [open, data]);

  // =========================
  // SCORE CHANGE
  // =========================

  const handleScoreChange = (dimension: string, value: string) => {
    const numericValue = Math.min(100, Math.max(0, Number(value)));

    setScores((prev) => ({
      ...prev,
      [dimension]: numericValue,
    }));
  };

  // =========================
  // OPEN CONFIRMATION
  // =========================

  const handleSaveClick = () => {
    setConfirmAction("save");
  };

  const handleAcceptAIClick = () => {
    setConfirmAction("accept-ai");
  };

  // =========================
  // CONFIRM ACTION
  // =========================

  const handleConfirm = () => {
    if (!data || !confirmAction) return;

    setConfirmLoading(true);

    if (confirmAction === "save") {
      onSave?.(data.id, scores, teacherNote, "koreksi");
    }

    if (confirmAction === "accept-ai") {
      const aiScores: Record<string, number> = {};

      data.dimensions.forEach((dimension) => {
        aiScores[dimension.name] = dimension.aiScore;
      });

      setScores(aiScores);

      onSave?.(
        data.id,
        aiScores,
        "Sesuai, skor AI diterima langsung.",
        "terima",
      );
    }

    setConfirmLoading(false);
    setConfirmAction(null);
  };

  // =========================
  // CONFIRM CONTENT
  // =========================

  const isSaveConfirmation = confirmAction === "save";

  const confirmTitle = isSaveConfirmation
    ? "Simpan Koreksi Skor?"
    : "Terima Skor AI?";

  const confirmDescription = isSaveConfirmation
    ? "Apakah Anda yakin ingin menyimpan perubahan skor dan catatan guru untuk asesmen ini?"
    : "Apakah Anda yakin ingin menerima seluruh skor dari AI tanpa melakukan perubahan?";

  const confirmText = isSaveConfirmation ? "Ya, Simpan" : "Ya, Terima Skor AI";

  return (
    <>
      {/* =========================
          REVIEW MODAL
      ========================= */}

      <Modal
        open={open}
        onClose={onClose}
        size="lg"
        footer={
          <>
            <Button variant="primary" onClick={handleSaveClick}>
              Koreksi & Simpan Skor
            </Button>

            <Button variant="outline" onClick={handleAcceptAIClick}>
              Terima Skor AI
            </Button>
          </>
        }
      >
        {!data ? (
          <div className="p-6 text-center text-description">
            Data asesmen tidak tersedia.
          </div>
        ) : (
          <div className="flex max-h-[80vh] flex-col">
            {/* =========================
                HEADER
            ========================= */}

            <div className="shrink-0 border-b border-border pb-5">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Tinjau Asesmen
              </p>

              <h2 className="mt-2 text-xl font-bold text-text">
                {data.studentName} · {data.questionTitle}
              </h2>

              <p className="mt-1 text-sm text-description">
                AI memberi skor rata-rata {data.aiScore} · diajukan untuk review
                manual
              </p>

              <div className="mt-4">
                <Badge variant="danger">Perlu Verifikasi</Badge>
              </div>
            </div>

            {/* =========================
                CONTENT
            ========================= */}

            {/* CATATAN AI */}

            <section>
              <h3 className="mb-2 text-sm font-semibold text-text">
                Catatan dari AI
              </h3>

              <div className="rounded-xl border border-border bg-background p-4">
                <p className="text-sm leading-relaxed text-description">
                  {data.aiNote}
                </p>
              </div>
            </section>

            {/* DIMENSIONS */}

            <section>
              <h3 className="mb-3 text-sm font-semibold text-text">
                Nilai AI & Override Skor Guru per Dimensi
              </h3>

              <div className="grid gap-3 sm:grid-cols-2">
                {data.dimensions.map((dimension) => (
                  <div
                    key={dimension.name}
                    className="rounded-xl border border-border p-4"
                  >
                    <p className="mb-4 text-sm font-semibold text-text">
                      {dimension.name}
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      {/* NILAI AI */}

                      <div>
                        <label className="mb-1 block text-[10px] font-bold uppercase text-description">
                          Nilai AI
                        </label>

                        <input
                          type="number"
                          value={dimension.aiScore}
                          disabled
                          className="
                              h-10
                              w-full
                              rounded-lg
                              border
                              border-border
                              bg-background
                              px-3
                              text-sm
                              text-description
                              outline-none
                            "
                        />
                      </div>

                      {/* SKOR GURU */}

                      <div>
                        <label className="mb-1 block text-[10px] font-bold uppercase text-primary">
                          Skor Guru
                        </label>

                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={scores[dimension.name] ?? 0}
                          onChange={(event) =>
                            handleScoreChange(
                              dimension.name,
                              event.target.value,
                            )
                          }
                          className="
                              h-10
                              w-full
                              rounded-lg
                              border
                              border-primary
                              bg-surface
                              px-3
                              text-sm
                              font-medium
                              text-text
                              outline-none
                              transition
                              focus:ring-2
                              focus:ring-primary/20
                            "
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-xs leading-relaxed text-description">
                Nilai AI ditampilkan sebagai referensi dan tidak dapat diubah.
                Anda dapat mengubah Skor Guru pada setiap dimensi untuk
                menentukan hasil akhir.
              </p>
            </section>

            {/* CATATAN GURU */}

            <section>
              <h3 className="mb-2 text-sm font-semibold text-text">
                Catatan Guru
                <span className="ml-1 font-normal text-description">
                  (opsional)
                </span>
              </h3>

              <Textarea
                value={teacherNote}
                onChange={(event) => setTeacherNote(event.target.value)}
                placeholder="Tuliskan catatan tambahan untuk siswa..."
                rows={3}
              />
            </section>
            {/* </div> */}

            {/* =========================
                ACTION
            ========================= */}
            {/* 
            <div className="flex shrink-0 flex-wrap gap-3 border-t border-border py-5">
              <Button variant="primary" onClick={handleSaveClick}>
                Koreksi & Simpan Skor
              </Button>

              <Button variant="outline" onClick={handleAcceptAIClick}>
                Terima Skor AI
              </Button>
            </div> */}
          </div>
        )}
      </Modal>

      {/* =========================
          CONFIRM MODAL
      ========================= */}

      <ConfirmModal
        open={confirmAction !== null}
        title={confirmTitle}
        description={confirmDescription}
        confirmText={confirmText}
        cancelText="Batal"
        loading={confirmLoading}
        onClose={() => {
          setConfirmAction(null);
        }}
        onConfirm={handleConfirm}
      />
    </>
  );
}
