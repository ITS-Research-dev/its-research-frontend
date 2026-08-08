import PageHeader from "@/components/common/PageHeader";

import VerificationStats from "@/components/verification/VerificationStats";
import VerificationTable from "@/components/verification/VerificationTable";

import { verificationData, verificationDetails } from "@/data/verification";

export default function TeacherVerificationPage() {
  // =========================
  // Statistik
  // =========================

  const totalStudents = 35;

  const totalSubmitted = verificationData.length;

  const totalPending = verificationData.filter(
    (item) => item.status === "Perlu Verifikasi",
  ).length;

  const totalReviewed = verificationData.filter(
    (item) => item.status === "Selesai",
  ).length;

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
          data={verificationData}
          details={verificationDetails}
        />
      </section>
    </div>
  );
}
