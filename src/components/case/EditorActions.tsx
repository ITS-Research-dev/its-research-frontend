"use client";

import Button from "@/components/ui/Button";
import { Clock, RotateCcw } from "lucide-react";

interface Props {
  submitted: boolean;
  running: boolean;
  retryStatus?: string;
  onRun: () => void;
  onSubmit: () => void;
  onRetry?: () => void;
}

export default function EditorActions({
  submitted,
  running,
  retryStatus,
  onRun,
  onSubmit,
  onRetry,
}: Props) {
  if (submitted) {
    return (
      <div className="flex justify-end gap-3">
        {retryStatus === "requested" ? (
          <Button variant="outline" disabled startIcon={<Clock size={16} />}>
            Menunggu Persetujuan
          </Button>
        ) : (
          <Button variant="outline" startIcon={<RotateCcw size={16} />} onClick={onRetry}>
            Coba Ulang
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex justify-end gap-3">
      <Button
        variant="secondary"
        onClick={onRun}
        disabled={running}
      >
        {running ? "Menjalankan..." : "Uji Coba"}
      </Button>

      <Button onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
}

