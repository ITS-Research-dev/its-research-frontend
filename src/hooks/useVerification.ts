"use client";

import { useCallback, useEffect, useState } from "react";
import verificationService, { ReviewPayload } from "@/services/verification.service";
import { VerificationDetail } from "@/types/verification";
import { useClassStore } from "@/store/class.store";

export function useVerification() {
  const [verifications, setVerifications] = useState<VerificationDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const selectedClassId = useClassStore((s) => s.selectedClassId);

  const fetchQueue = useCallback(async () => {
    if (!selectedClassId) {
      setVerifications([]);
      return [];
    }

    setError(null);
    try {
      const data = await verificationService.getQueue(selectedClassId);
      setVerifications(data);
      return data;
    } catch (err: any) {
      console.error("Error fetching verifications:", err);
      setError(err?.message || "Failed to load verifications");
      throw err;
    }
  }, [selectedClassId]);

  const load = useCallback(async () => {
    if (!selectedClassId) {
      setLoading(false);
      setVerifications([]);
      return;
    }

    setLoading(true);
    try {
      await fetchQueue();
    } catch {
      // error handled in fetchQueue
    } finally {
      setLoading(false);
    }
  }, [fetchQueue, selectedClassId]);

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
  const totalStudents = new Set(
    verifications.map((item) => item.studentId || item.studentName),
  ).size;

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
