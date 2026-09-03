"use client";

import { BookOpen, FileQuestion } from "lucide-react";
import StatCard from "@/components/profile/StatCard";

interface Props {
  totalMaterials: number;
  totalQuestions: number ;
}

export default function BankStats({ totalMaterials, totalQuestions }: Props) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <StatCard
        value={totalMaterials}
        title="Total materi aktif"
        icon={BookOpen}
        iconColor="text-primary"
        iconBackground="bg-primary/10"
      />

      <StatCard
        value={totalQuestions}
        title="Total soal aktif"
        icon={FileQuestion}
        iconColor="text-primary"
        iconBackground="bg-primary/10"
      />
    </div>
  );
}
