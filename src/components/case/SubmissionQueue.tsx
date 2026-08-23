"use client";

import { useEffect, useState } from "react";
import { Loader2, CheckCircle2, XCircle, Clock, ListOrdered } from "lucide-react";

import Card from "@/components/ui/Card";
import { QueueItem } from "@/types/queue";

interface Props {
  items: QueueItem[];
  onItemClick: (questionIndex: number) => void;
}

function ElapsedTimer({ startedAt }: { startedAt: number }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    setElapsed(Math.floor((Date.now() - startedAt) / 1000));

    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startedAt]);

  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  return (
    <span className="tabular-nums text-xs text-description">
      {minutes}:{String(seconds).padStart(2, "0")}
    </span>
  );
}

function RunningItem({
  item,
  onClick,
}: {
  item: QueueItem;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl bg-primary/5 border border-primary/20 px-4 py-3 text-left transition-all hover:bg-primary/10"
    >
      <div className="relative flex-shrink-0">
        <Loader2 size={20} className="animate-spin text-primary" />
        <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary animate-pulse" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-text">
          {item.questionTitle}
        </p>
        <p className="text-xs text-primary font-medium">Sedang dinilai AI...</p>
      </div>

      {item.startedAt && <ElapsedTimer startedAt={item.startedAt} />}
    </button>
  );
}

function QueuedItem({
  item,
  position,
  onClick,
}: {
  item: QueueItem;
  position: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl bg-white border border-border px-4 py-3 text-left transition-all hover:bg-gray-50"
    >
      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-warning/10 text-xs font-bold text-warning">
        #{position}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-text">
          {item.questionTitle}
        </p>
        <p className="text-xs text-description">Menunggu antrian...</p>
      </div>

      <Clock size={14} className="flex-shrink-0 text-description" />
    </button>
  );
}

function CompletedItem({
  item,
  onClick,
}: {
  item: QueueItem;
  onClick: () => void;
}) {
  const isSuccess = item.status === "completed";

  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all hover:shadow-sm ${
        isSuccess
          ? "border-success/20 bg-success-bg/30 hover:bg-success-bg/50"
          : "border-danger/20 bg-danger-bg/30 hover:bg-danger-bg/50"
      }`}
    >
      {isSuccess ? (
        <CheckCircle2 size={20} className="flex-shrink-0 text-success" />
      ) : (
        <XCircle size={20} className="flex-shrink-0 text-danger" />
      )}

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-text">
          {item.questionTitle}
        </p>
        <p className={`text-xs ${isSuccess ? "text-success-text" : "text-danger-text"}`}>
          {isSuccess
            ? `Skor: ${item.result?.score ?? "-"} — ${item.result?.level ?? ""}`
            : item.error ?? "Gagal menilai"}
        </p>
      </div>

      <span className="flex-shrink-0 text-xs font-medium text-primary">
        Lihat →
      </span>
    </button>
  );
}

export default function SubmissionQueue({ items, onItemClick }: Props) {
  const running = items.find((i) => i.status === "running");
  const queued = items.filter((i) => i.status === "queued");
  const finished = items.filter(
    (i) => i.status === "completed" || i.status === "failed",
  );

  if (items.length === 0) return null;

  const totalActive = (running ? 1 : 0) + queued.length;

  return (
    <Card className="!p-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-gradient-to-r from-primary/5 to-transparent px-5 py-3">
        <div className="flex items-center gap-2">
          <ListOrdered size={16} className="text-primary" />
          <h3 className="text-sm font-semibold text-text">Antrian Submission</h3>
        </div>

        {totalActive > 0 && (
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-white">
            {totalActive}
          </span>
        )}
      </div>

      {/* Queue Items */}
      <div className="space-y-2 p-3">
        {/* Running */}
        {running && (
          <RunningItem
            item={running}
            onClick={() => onItemClick(running.questionIndex)}
          />
        )}

        {/* Queued */}
        {queued.map((item, index) => (
          <QueuedItem
            key={item.id}
            item={item}
            position={index + 1}
            onClick={() => onItemClick(item.questionIndex)}
          />
        ))}

        {/* Completed / Failed */}
        {finished.map((item) => (
          <CompletedItem
            key={item.id}
            item={item}
            onClick={() => onItemClick(item.questionIndex)}
          />
        ))}

        {/* Empty running state */}
        {!running && queued.length === 0 && finished.length > 0 && (
          <p className="py-1 text-center text-xs text-description">
            Semua submission selesai diproses
          </p>
        )}
      </div>
    </Card>
  );
}
