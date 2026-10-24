"use client";

import { useCallback, useEffect, useState } from "react";
import verificationService, {
  ReviewPayload,
} from "@/services/verification.service";
import { VerificationDetail } from "@/types/verification";
import { useClassStore } from "@/store/class.store";
import { storage } from "@/utils/storage";

export function useVerification() {
  const [verifications, setVerifications] = useState<VerificationDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const selectedClassId = useClassStore((s) => s.selectedClassId);

  // ─── LOAD ────────────────────────────────────────────────────────────
  const fetchQueue = useCallback(async () => {
    const classIdToFetch = selectedClassId || storage.getClass()[0]?.value;

    setError(null);
    try {
      const data = await verificationService.getQueue(classIdToFetch);
      setVerifications(data);
      return data;
    } catch (err: unknown) {
      const message =
        (
          err as {
            response?: { data?: { message?: string } };
            message?: string;
          }
        )?.response?.data?.message ||
        (err as { message?: string })?.message ||
        "Failed to load verifications";
      console.error("Error fetching verifications:", err);
      setError(message);
      throw err;
    }
  }, [selectedClassId]);

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

  // ─── ACTIONS ─────────────────────────────────────────────────────────
  const submitReview = async (id: string, payload: ReviewPayload) => {
    await verificationService.submitReview(id, payload);
    await fetchQueue();
  };

  /**
   * Guru approve retry → set status & deadline via API, lalu refresh antrian.
   */
  const approveRetry = async (id: string, deadline: string): Promise<void> => {
    await verificationService.approveRetry(id, deadline);
    await fetchQueue();
  };

  // ─── STATS ───────────────────────────────────────────────────────────
  const totalSubmitted = verifications.length;
  const totalPending = verifications.filter(
    (item) =>
      item.status === "Perlu di verifikasi" ||
      item.status === "Sedang dikerjakan ulang",
  ).length;
  const totalReviewed = verifications.filter(
    (item) =>
      item.status === "Selesai dikerjakan ulang" ||
      item.status === "Sudah di Verifikasi",
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
    approveRetry,
    totalSubmitted,
    totalPending,
    totalReviewed,
    totalStudents,
  };
}
