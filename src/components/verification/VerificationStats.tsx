"use client";

import StatCard from "@/components/profile/StatCard";

import { ClipboardCheck, Clock3, CheckCircle2 } from "lucide-react";

interface Props {
  totalSubmitted: number;
  totalStudents: number;
  totalPending: number;
  totalReviewed: number;
}

export default function VerificationStats({
  totalSubmitted,
  totalStudents,
  totalPending,
  totalReviewed,
}: Props) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      <StatCard
        title={`Total yang sudah submit`}
        value={`${totalSubmitted}/${totalStudents}`}
        icon={ClipboardCheck}
        iconColor="text-primary"
        iconBackground="bg-primary/10"
      />

      <StatCard
        title="Belum diperiksa/dinilai"
        value={totalPending}
        icon={Clock3}
        iconColor="text-danger"
        iconBackground="bg-danger/10"
      />

      <StatCard
        title="Sudah diperiksa/dinilai"
        value={totalReviewed}
        icon={CheckCircle2}
        iconColor="text-success"
        iconBackground="bg-success/10"
      />
    </div>
  );
}
