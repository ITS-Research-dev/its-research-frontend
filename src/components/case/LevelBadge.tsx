"use client";

import Badge from "@/components/ui/Badge";

interface Props {
  level: string;
}

const colors: Record<string, "success" | "warning" | "primary" | "danger"> = {
  Novice: "danger",
  Beginner: "warning",
  Competent: "primary",
  Proficient: "success",
  Expert: "success",
};

export default function LevelBadge({ level }: Props) {
  return (
    <div className="space-y-2">
      <Badge variant={colors[level] ?? "primary"}>Level: {level}</Badge>
    </div>
  );
}
