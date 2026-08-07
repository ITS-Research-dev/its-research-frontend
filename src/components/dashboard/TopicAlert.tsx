"use client";

import { TriangleAlert } from "lucide-react";

interface Props {
  title: string;

  topic: string;

  score: number;

  variant?: "danger" | "warning";
}

export default function TopicAlert({
  title,
  topic,
  score,
  variant = "warning",
}: Props) {
  const styles = {
    danger: {
      bg: "bg-danger/10",
      text: "text-danger",
      icon: "text-danger",
    },

    warning: {
      bg: "bg-warning/10",
      text: "text-warning",
      icon: "text-warning",
    },
  };

  return (
    <div
      className={`
        flex
        items-center
        gap-3
        rounded-xl
        p-4
        ${styles[variant].bg}
      `}
    >
      <TriangleAlert size={20} className={styles[variant].icon} />

      <p className="text-sm text-text">
        <span className={styles[variant].text}>{title}</span>{" "}
        <span className="font-semibold">{topic}</span>{" "}
        <span className="text-description">(rata-rata {score})</span>
      </p>
    </div>
  );
}
