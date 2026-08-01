import { Award, Lightbulb, BookOpen, ClipboardCheck } from "lucide-react";

import StatCard from "./StatCard";

import { ProfileSummary } from "@/types/profile";

interface Props {
  summary: ProfileSummary;
}

export default function ProfileStats({ summary }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Rata-rata Nilai"
        value={summary.averageScore}
        icon={Award}
        iconColor="text-success"
        iconBackground="bg-success/10"
      />

      <StatCard
        title="Total Hint Digunakan"
        value={`${summary.totalHints}x`}
        icon={Lightbulb}
        iconColor="text-warning"
        iconBackground="bg-warning/10"
      />

      <StatCard
        title="Materi Dipelajari"
        value={summary.totalMaterials}
        icon={BookOpen}
        iconColor="text-primary"
        iconBackground="bg-primary/10"
      />

      <StatCard
        title="Studi Kasus Dikerjakan"
        value={summary.totalCases}
        icon={ClipboardCheck}
        iconColor="text-info"
        iconBackground="bg-info/10"
      />
    </div>
  );
}
