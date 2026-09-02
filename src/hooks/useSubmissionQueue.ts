"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { QueueItem, QueueStatus } from "@/types/queue";
import { CompetencyScore } from "@/types/asessment";
import caseService, {
  BackendQueueItem,
  mapScoringToCompetencies,
  SubmitToQueuePayload,
} from "@/services/case.service";
import { storage } from "@/utils/storage";
import { ROUTES } from "@/constants/routes";

interface QueueStats {
  waiting: number;
  active: number;
  completed: number;
  failed: number;
}

interface UseSubmissionQueueReturn {
  /** All queue items for the current user (mapped to QueueItem format) */
  items: QueueItem[];
  /** Global queue stats (anonymous) */
  stats: QueueStats;
  /** Whether the hook is connected to SSE */
  connected: boolean;
  /** Submit a new item to the backend queue */
  submit: (
    payload: SubmitToQueuePayload,
    questionIndex: number,
  ) => Promise<void>;
  /** Check if a question is queued or running */
  isQueued: (questionId: string) => boolean;
  /** Get the queue position for a question (0 = not queued) */
  getPosition: (questionId: string) => number;
  /** Whether any item is currently running */
  hasRunning: boolean;
}

/**
 * Maps a backend queue item to the frontend QueueItem format.
 * The `questionIndex` is unknown from the backend, so it defaults to 0
 * and gets patched by the caller.
 */
function mapBackendToQueueItem(
  item: BackendQueueItem,
  questionIndex: number,
): QueueItem {
  const queueItem: QueueItem = {
    id: item.id,
    questionId: item.testId,
    questionTitle: item.questionTitle,
    questionIndex,
    status: item.status as QueueStatus,
    payload: {
      soal: "",
      expectedOutput: "",
      studentCode: "",
      hintUsage: 0,
    },
    submittedAt: item.submittedAt,
    startedAt: item.startedAt,
    completedAt: item.completedAt,
  };

  if (item.status === "completed" && item.result) {
    const competencies: CompetencyScore[] = item.result.aiScore
      ? mapScoringToCompetencies(item.result.aiScore)
      : [];

    queueItem.result = {
      submitted: true,
      score: Math.round(item.result.overallScore),
      level: item.result.level,
      feedback: item.result.aiSuggestion,
      competencies,
    };
  }

  if (item.status === "failed") {
    queueItem.error =
      item.error ||
      "Terjadi kesalahan saat menilai jawaban. Pastikan server AI aktif dan coba lagi.";
  }

  return queueItem;
}

/**
 * Hook that connects to the backend submission queue via SSE.
 * Provides reactive queue state for all components.
 *
 * @param questionIdToIndex - Map of question IDs to their index (for navigation)
 */
export function useSubmissionQueue(
  questionIdToIndex: Record<string, number>,
): UseSubmissionQueueReturn {
  const [items, setItems] = useState<QueueItem[]>([]);
  const [stats, setStats] = useState<QueueStats>({
    waiting: 0,
    active: 0,
    completed: 0,
    failed: 0,
  });
  const [connected, setConnected] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);
  const questionMapRef = useRef(questionIdToIndex);

  // Keep the question map ref up to date
  useEffect(() => {
    questionMapRef.current = questionIdToIndex;
  }, [questionIdToIndex]);

  /**
   * Fetch the current user's queue from the backend.
   * Used on mount and after reconnection to restore state.
   */
  const fetchMyQueue = useCallback(async () => {
    try {
      const backendItems = await caseService.getMyQueue();
      const mapped = backendItems.map((item) =>
        mapBackendToQueueItem(
          item,
          questionMapRef.current[item.testId] ?? 0,
        ),
      );
      setItems(mapped);
    } catch (e) {
      console.warn("Failed to fetch queue:", e);
    }
  }, []);

  /**
   * Connect to the SSE endpoint for real-time updates.
   */
  useEffect(() => {
    // Initial fetch to restore state (covers page refresh)
    fetchMyQueue();

    const token = storage.getToken();
    if (!token) return;

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
    const sseUrl = `${baseUrl}${ROUTES.API.STUDENT.SUBMISSION_EVENTS}`;

    // EventSource doesn't support custom headers, so we pass the token as a query param.
    // The backend SSE endpoint should accept ?token= as an alternative to Authorization header.
    const es = new EventSource(`${sseUrl}?token=${encodeURIComponent(token)}`);
    eventSourceRef.current = es;

    es.onopen = () => {
      setConnected(true);
    };

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        switch (data.type) {
          case "queue:stats":
            setStats(data.data);
            break;

          case "job:queued":
            // Already added optimistically in submit(), but update position
            setItems((prev) =>
              prev.map((item) =>
                String(item.id) === String(data.jobId)
                  ? { ...item, status: "queued" as const }
                  : item,
              ),
            );
            break;

          case "job:active":
            setItems((prev) =>
              prev.map((item) =>
                String(item.id) === String(data.jobId)
                  ? {
                      ...item,
                      status: "running" as const,
                      startedAt: data.timestamp,
                    }
                  : item,
              ),
            );
            break;

          case "job:completed": {
            const result = data.data?.result;
            const competencies: CompetencyScore[] = result?.aiScore
              ? mapScoringToCompetencies(result.aiScore)
              : [];

            setItems((prev) =>
              prev.map((item) =>
                String(item.id) === String(data.jobId)
                  ? {
                      ...item,
                      status: "completed" as const,
                      completedAt: data.timestamp,
                      result: {
                        submitted: true,
                        score: Math.round(result?.overallScore ?? 0),
                        level: result?.level ?? "",
                        feedback: result?.aiSuggestion ?? "",
                        competencies,
                      },
                    }
                  : item,
              ),
            );
            break;
          }

          case "job:failed":
            setItems((prev) =>
              prev.map((item) =>
                String(item.id) === String(data.jobId)
                  ? {
                      ...item,
                      status: "failed" as const,
                      completedAt: data.timestamp,
                      error:
                        data.data?.error ||
                        "Terjadi kesalahan saat menilai jawaban.",
                    }
                  : item,
              ),
            );
            break;

          case "heartbeat":
            // Keep-alive, do nothing
            break;
        }
      } catch (e) {
        console.warn("Failed to parse SSE event:", e);
      }
    };

    es.onerror = () => {
      setConnected(false);
      // EventSource auto-reconnects by default
    };

    return () => {
      es.close();
      eventSourceRef.current = null;
      setConnected(false);
    };
  }, [fetchMyQueue]);

  /**
   * Submit a new item to the backend queue.
   * Optimistically adds the item to local state for immediate UI feedback.
   */
  const submit = useCallback(
    async (payload: SubmitToQueuePayload, questionIndex: number) => {
      const { jobId, position, totalWaiting } =
        await caseService.submitToQueue(payload);

      // Optimistically add to local state
      const newItem: QueueItem = {
        id: String(jobId),
        questionId: payload.testId,
        questionTitle: payload.questionTitle || "Soal",
        questionIndex,
        status: "queued",
        payload: {
          soal: payload.soal,
          expectedOutput: payload.expectedOutput,
          studentCode: payload.studentCode,
          hintUsage: payload.hintUsage,
        },
        submittedAt: Date.now(),
      };

      setItems((prev) => [...prev, newItem]);

      setStats((prev) => ({
        ...prev,
        waiting: totalWaiting,
      }));
    },
    [],
  );

  const isQueued = useCallback(
    (questionId: string) =>
      items.some(
        (item) =>
          item.questionId === questionId &&
          (item.status === "queued" || item.status === "running"),
      ),
    [items],
  );

  const getPosition = useCallback(
    (questionId: string) => {
      const queuedItems = items.filter((i) => i.status === "queued");
      const idx = queuedItems.findIndex((i) => i.questionId === questionId);
      return idx >= 0 ? idx + 1 : 0;
    },
    [items],
  );

  const hasRunning = items.some((i) => i.status === "running");

  return {
    items,
    stats,
    connected,
    submit,
    isQueued,
    getPosition,
    hasRunning,
  };
}
