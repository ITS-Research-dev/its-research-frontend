"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { VerificationItem } from "@/types/verification";

interface Props {
  open: boolean;
  data?: VerificationItem;
  onClose: () => void;
  onConfirm: (id: string, deadline: string) => Promise<void>;
}

export default function RetryModal({ open, data, onClose, onConfirm }: Props) {
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    if (!data) return;

    if (!deadline) {
      setError("Deadline harus diisi.");
      return;
    }

    const deadlineDate = new Date(deadline);
    const now = new Date();

    if (isNaN(deadlineDate.getTime())) {
      setError("Format deadline tidak valid.");
      return;
    }

    if (deadlineDate <= now) {
      setError("Deadline harus lebih dari waktu saat ini.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await onConfirm(data.id, deadlineDate.toISOString());
      setDeadline("");
      onClose();
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } }; message?: string })
          ?.response?.data?.message ||
        (err as { message?: string })?.message ||
        "Terjadi kesalahan saat menyetujui coba ulang.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setDeadline("");
    setError(null);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Setujui Coba Ulang"
      footer={
        <>
          <Button
            variant="primary"
            onClick={handleConfirm}
            disabled={loading || !deadline}
          >
            {loading ? "Menyimpan..." : "Setujui"}
          </Button>

          <Button variant="outline" onClick={handleClose} disabled={loading}>
            Batal
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {data && (
          <div className="rounded-xl border border-border bg-background p-4">
            <p className="text-sm font-semibold text-text">
              {data.studentName}
            </p>
            <p className="mt-0.5 text-xs text-description">
              {data.questionTitle}
            </p>
          </div>
        )}

        <div className="space-y-1.5">
          <label
            htmlFor="retry-deadline"
            className="block text-sm font-semibold text-text"
          >
            Deadline Coba Ulang
          </label>

          <input
            id="retry-deadline"
            type="datetime-local"
            value={deadline}
            onChange={(e) => {
              setDeadline(e.target.value);
              if (error) setError(null);
            }}
            min={new Date().toISOString().slice(0, 16)}
            className="h-10 w-full rounded-lg border border-border bg-surface px-3 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />

          <p className="text-xs text-description">
            Siswa harus menyelesaikan coba ulang sebelum deadline ini.
          </p>
        </div>

        {error && (
          <p className="rounded-lg bg-danger/5 px-3 py-2 text-sm text-danger">
            {error}
          </p>
        )}
      </div>
    </Modal>
  );
}
