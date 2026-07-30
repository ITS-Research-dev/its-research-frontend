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

  return (
    <Card
      className={`
        p-2
        transition-all
        duration-200
        hover:border-primary
        hover:shadow-md
        ${className}
      `}
    >
      <div className="flex items-center gap-6">
        {/* Icon */}
        <div
          className={`
            flex
            h-16
            w-16
            shrink-0
            items-center
            justify-center
            rounded-2xl
            ${config.iconBg}
          `}
        >
          {status === "locked" ? (
            <Lock size={28} className={config.iconColor} />
          ) : (
            <Icon size={28} className={config.iconColor} />
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <Badge variant={config.variant}>{config.badge}</Badge>

          <h3 className="mt-2 text-xl font-semibold text-text">{title}</h3>
        </div>

        {/* Action */}
        <div className="ml-auto shrink-0">
          {status === "locked" ? (
            <Button variant="outline" disabled>
              {config.button}
            </Button>
          ) : (
            <Link href={`/student/materials/${id}`}>
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
