"use client";

import EmptyState from "@/components/common/EmptyState";
import PageHeader from "@/components/common/PageHeader";
import VerificationStats from "@/components/verification/VerificationStats";
import VerificationTable from "@/components/verification/VerificationTable";
import { useVerification } from "@/hooks/useVerification";

export default function TeacherVerificationPage() {
  const {
    verifications,
    loading,
    submitReview,
    totalSubmitted,
    totalPending,
    totalReviewed,
    totalStudents,
  } = useVerification();

  if (loading) {
    return (
      <EmptyState
        title="Verifikasi & Final Review"
        description="Memuat data verifikasi..."
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* =========================
          HEADER
      ========================= */}
      <PageHeader
        title="Verifikasi & Final Review"
        description="Sistem menandai submission dengan skor tidak lazim untuk direview lebih dulu."
      />

      {/* =========================
          STATISTICS
      ========================= */}
      <VerificationStats
        totalSubmitted={totalSubmitted}
        totalStudents={totalStudents}
        totalPending={totalPending}
        totalReviewed={totalReviewed}
      />

      {/* =========================
          TABLE
      ========================= */}
      <section className="rounded-2xl border border-border bg-surface p-6">
        <VerificationTable
          data={verifications}
          details={verifications}
          onReviewSubmit={submitReview}
        />
      </section>
    </div>
  );
}
