"use client";

import { useCallback, useEffect, useState } from "react";
import verificationService, { ReviewPayload } from "@/services/verification.service";
import { VerificationDetail } from "@/types/verification";

export function useVerification() {
  const [verifications, setVerifications] = useState<VerificationDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await verificationService.getQueue();
      setVerifications(data);
    } catch (err: any) {
      console.error("Error fetching verifications:", err);
      setError(err?.message || "Failed to load verifications");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const submitReview = async (id: string, payload: ReviewPayload) => {
    try {
      await verificationService.submitReview(id, payload);
    } catch (err) {
      console.error("Failed to submit review:", err);
    } finally {
      await load();
    }
  };

  const totalSubmitted = verifications.length;
  const totalPending = verifications.filter(
    (item) => item.status === "Perlu Verifikasi",
  ).length;
  const totalReviewed = verifications.filter(
    (item) => item.status === "Selesai",
  ).length;
  const totalStudents = Math.max(35, totalSubmitted);

  return {
    verifications,
    loading,
    error,
    reload: load,
    submitReview,
    totalSubmitted,
    totalPending,
    totalReviewed,
    totalStudents,
  };
}
