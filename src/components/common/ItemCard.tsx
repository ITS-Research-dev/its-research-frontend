"use client";

import Link from "next/link";
import { BookOpen, BrainCircuit, Code2, FileCode, Lock } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export type ItemStatus = "completed" | "learning" | "locked";
export type ItemIcon = "book" | "code" | "brain" | "file";

interface ItemCardProps {
  id: string;
  title: string;
  status: ItemStatus;
  icon?: ItemIcon;
  buttonText?: string;
  className?: string;
  href: string;
  totalTest?: number;
  submittedCount?: number;
  progressMessage?: string;
  showProgress?: boolean;
}

const icons = {
  book: BookOpen,
  code: Code2,
  brain: BrainCircuit,
  file: FileCode,
};

export default function ItemCard({
  id,
  title,
  status,
  icon = "book",
  buttonText,
  className = "",
  href,
  totalTest,
  submittedCount,
  progressMessage,
  showProgress = false,
}: ItemCardProps) {
  const Icon = icons[icon];

  const statusConfig = {
    completed: {
      badge: "Selesai",
      variant: "success" as const,
      iconBg: "bg-success/10",
      iconColor: "text-success",
      button: buttonText ?? "Review",
      disabled: false,
    },
    learning: {
      badge: "Sedang Berlangsung",
      variant: "warning" as const,
      iconBg: "bg-warning/10",
      iconColor: "text-warning",
      button: buttonText ?? "Lanjutkan",
      disabled: false,
    },
    locked: {
      badge: "Belum Dimulai",
      variant: "secondary" as const,
      iconBg: "bg-secondary/10",
      iconColor: "text-secondary",
      button: buttonText ?? "Terkunci",
      disabled: true,
    },
  };

  const config = statusConfig[status];

  /* ── Progress bar ── */
  const safeTotal = totalTest || 0;
  const safeSubmitted = submittedCount || 0;
  const percent =
    safeTotal > 0
      ? Math.min(100, Math.round((safeSubmitted / safeTotal) * 100))
      : 0;

  const progressBarColor =
    percent === 100 ? "bg-success" : percent > 0 ? "bg-primary" : "bg-border";

  const progressTrackColor = percent === 100 ? "bg-primary/15" : "bg-surface";

  return (
    <Card
      className={`p-4 transition-all duration-200 hover:border-primary hover:shadow-md ${className}`}
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div
          className={`mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${config.iconBg}`}
        >
          {status === "locked" ? (
            <Lock size={26} className={config.iconColor} />
          ) : (
            <Icon size={26} className={config.iconColor} />
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <Badge variant={config.variant}>{config.badge}</Badge>

          <h3 className="mt-2 text-xl font-semibold text-text">{title}</h3>

          {/* Progress Bar — hanya tampil jika showProgress === true */}
          {showProgress && (
            <div className=" w-150 mt-2 space-y-1.5">
              {/* Track */}
              <div
                className={`h-2 w-full overflow-hidden rounded-full ${progressTrackColor}`}
              >
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${progressBarColor}`}
                  style={{ width: `${percent}%` }}
                />
              </div>

              {/* Labels */}
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-description">
                  {progressMessage ?? (
                    <>
                      <span className="font-medium text-text">
                        {safeSubmitted}
                      </span>{" "}
                      / {safeTotal > 0 ? safeTotal : "?"} soal selesai
                    </>
                  )}
                </p>
                <span className="shrink-0 text-xs font-semibold text-description">
                  {percent}%
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Action */}
        <div className="ml-2 shrink-0 pt-1">
          {status === "locked" ? (
            <Button variant="outline" disabled>
              {config.button}
            </Button>
          ) : (
            <Link href={href}>
              <Button variant={status === "learning" ? "primary" : "outline"}>
                {config.button}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
}
