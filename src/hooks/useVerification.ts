"use client";

import { useCallback, useEffect, useState } from "react";
import verificationService, { ReviewPayload } from "@/services/verification.service";
import { VerificationDetail } from "@/types/verification";

export function useVerification() {
  const [verifications, setVerifications] = useState<VerificationDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQueue = useCallback(async () => {
    setError(null);
    try {
      const data = await verificationService.getQueue();
      setVerifications(data);
      return data;
    } catch (err: any) {
      console.error("Error fetching verifications:", err);
      setError(err?.message || "Failed to load verifications");
      throw err;
    }
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      await fetchQueue();
    } catch {
      // error handled in fetchQueue
    } finally {
      setLoading(false);
    }
  }, [fetchQueue]);

  useEffect(() => {
    load();
  }, [load]);

  const submitReview = async (id: string, payload: ReviewPayload) => {
    await verificationService.submitReview(id, payload);
    await fetchQueue();
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
