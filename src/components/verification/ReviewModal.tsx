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
    note: string,
    decision: "terima" | "koreksi",
  ) => void | Promise<void>;
}

type ConfirmAction = "save" | "accept-ai" | null;

export default function ReviewModal({ open, data, onClose, onSave }: Props) {
  const [scores, setScores] = useState<Record<string, number>>({});

  /**
   * Catatan berasal dari AI sebagai nilai awal,
   * tetapi tetap dapat diedit oleh guru.
   */
  const [note, setNote] = useState("");

  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);

  const [confirmLoading, setConfirmLoading] = useState(false);

  /* =========================
     INITIAL DATA
  ========================= */

  useEffect(() => {
    if (!open || !data) return;

    const initialScores: Record<string, number> = {};

    data.dimensions.forEach((dimension) => {
      initialScores[dimension.name] = dimension.teacherScore;
    });

    setScores(initialScores);

    /**
     * Catatan selalu dimulai dari AI.
     */
    setNote(data.aiNote ?? "");
  }, [open, data]);

  /* =========================
     SCORE CHANGE
  ========================= */

  const handleScoreChange = (dimension: string, value: string) => {
    const numericValue = Math.min(100, Math.max(0, Number(value)));

    setScores((prev) => ({
      ...prev,
      [dimension]: numericValue,
    }));
  };

  /* =========================
     OPEN CONFIRMATION
  ========================= */

  const handleSaveClick = () => {
    setConfirmAction("save");
  };

  const handleAcceptAIClick = () => {
    setConfirmAction("accept-ai");
  };

  /* =========================
     CONFIRM ACTION
  ========================= */

  const handleConfirm = async () => {
    if (!data || !confirmAction) return;

    setConfirmLoading(true);

    try {
      if (confirmAction === "save") {
        await onSave?.(data.id, scores, note, "koreksi");
      }

      if (confirmAction === "accept-ai") {
        const aiScores: Record<string, number> = {};

        data.dimensions.forEach((dimension) => {
          aiScores[dimension.name] = dimension.aiScore;
        });

        setScores(aiScores);

        await onSave?.(data.id, aiScores, note, "terima");
      }
    } finally {
      setConfirmLoading(false);
      setConfirmAction(null);
    }
  };

  /* =========================
     CONFIRM CONTENT
  ========================= */

  const isSaveConfirmation = confirmAction === "save";

  const confirmTitle = isSaveConfirmation
    ? "Simpan Koreksi Skor?"
    : "Terima Skor AI?";

  const confirmDescription = isSaveConfirmation
    ? "Apakah Anda yakin ingin menyimpan perubahan skor dan catatan untuk asesmen ini?"
    : "Apakah Anda yakin ingin menerima seluruh skor dari AI?";

  const confirmText = isSaveConfirmation ? "Ya, Simpan" : "Ya, Terima Skor AI";

  return (
    <>
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
          <div className="flex flex-col">
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

            <div className="space-y-6 py-6">
              {/* =========================
                  SOAL
              ========================= */}

              <section>
                <h3 className="mb-2 text-sm font-semibold text-text">Soal</h3>

                <div className="rounded-xl border border-border bg-background p-4">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-text">
                    {data.questionTitle}
                  </p>
                </div>
              </section>

              {/* =========================
                  JAWABAN SISWA
              ========================= */}

              <section>
                <h3 className="mb-2 text-sm font-semibold text-text">
                  Jawaban Siswa
                </h3>

                <div className="overflow-hidden rounded-xl border border-border">
                  {/* Header Code Editor */}

                  <div className="flex items-center justify-between border-b border-border bg-background px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                    </div>

                    <span className="font-mono text-xs text-description">
                      Jawaban Siswa
                    </span>
                  </div>

                  {/* Code */}

                  <pre className="overflow-x-auto bg-[#1e1e1e] p-5 text-sm leading-relaxed text-gray-100">
                    <code>
                      {data.userAnswer || data.code || "Jawaban siswa tidak tersedia."}
                    </code>
                  </pre>
                </div>
              </section>

              {/* =========================
                  NILAI & OVERRIDE
              ========================= */}

              <section>
                <div className="mb-3">
                  <h3 className="text-sm font-semibold text-text">
                    Nilai AI & Override Skor Guru
                  </h3>

                  <p className="mt-1 text-xs text-description">
                    Nilai AI digunakan sebagai referensi. Guru dapat mengubah
                    skor akhir pada setiap dimensi.
                  </p>
                </div>

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
              </section>

              {/* =========================
                  CATATAN
              ========================= */}

              <section>
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-text">Catatan</h3>

                  <span className="text-xs text-description">
                    Catatan awal dari AI, dapat diedit
                  </span>
                </div>

                <Textarea
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="Catatan untuk siswa..."
                  rows={4}
                />
              </section>
            </div>
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
