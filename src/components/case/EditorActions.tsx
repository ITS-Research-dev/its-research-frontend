"use client";

import Button from "@/components/ui/Button";

interface Props {
  submitted: boolean;
  running: boolean;
  onRun: () => void;
  onSubmit: () => void;
}

export default function EditorActions({
  submitted,
  running,
  onRun,
  onSubmit,
}: Props) {
  return (
    <div className="flex justify-end gap-3">
      <Button
        variant="secondary"
        onClick={onRun}
        disabled={submitted || running}
      >
        {running ? "Menjalankan..." : "Uji Coba"}
      </Button>

      <Button onClick={onSubmit} disabled={submitted}>
        {submitted ? "Sudah Disubmit" : "Submit"}
      </Button>
    </div>
  );
}
