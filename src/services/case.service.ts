import { ROUTES } from "@/constants/routes";
import api from "@/lib/api";
import { Scoring } from "@/types/profile";
import { CompetencyScore } from "@/types/asessment";
import { CaseDetail, CaseItem, RunCodePayload, RunCodeResponse } from "@/types/case";

/* ================================
 * Types
 * ================================ */

export interface SubmitCasePayload {
  soal: string;
  expectedOutput: string;
  studentCode: string;
  hintUsage: number;
}

export interface SubmitCaseResponse {
  aiScore: Scoring;
  overallScore: number;
  flagOverride: boolean;
  aiSuggestion: string;
  aiFinishTime: string;
  hintUsage: number;
  level: string;
}

/* ================================
 * Helpers
 * ================================ */

const COMPETENCY_LABEL_MAP: Record<keyof Scoring, string> = {
  fungsionalitas: "Fungsionalitas",
  logika: "Logika",
  syntax: "Syntax",
  code_style: "Code Style",
  dokumentasi: "Dokumentasi",
  konsep: "Konsep",
};

export function mapScoringToCompetencies(aiScore: Scoring): CompetencyScore[] {
  return (Object.keys(aiScore) as (keyof Scoring)[]).map((key) => ({
    name: COMPETENCY_LABEL_MAP[key] ?? key,
    score: aiScore[key],
  }));
}

/* ================================
 * Service
 * ================================ */

export interface SubmitToQueuePayload {
  soal: string;
  expectedOutput: string;
  studentCode: string;
  hintUsage: number;
  testId: string;
  questionTitle?: string;
}

export interface SubmitToQueueResponse {
  jobId: string;
  position: number;
  totalWaiting: number;
}

export interface BackendQueueItem {
  id: string;
  testId: string;
  questionTitle: string;
  status: "queued" | "running" | "completed" | "failed";
  result?: SubmitCaseResponse;
  error?: string;
  submittedAt: number;
  startedAt?: number;
  completedAt?: number;
  position?: number;
}

class CaseService {
  async getCases(): Promise<CaseItem[]> {
    const response = await api.get<CaseItem[]>(ROUTES.API.STUDENT.STUDY_CASE);
    return response.data;
  }

  async getCaseDetail(id: string): Promise<CaseDetail> {
    const response = await api.get<CaseDetail>(`${ROUTES.API.STUDENT.STUDY_CASE}/${id}`);
    return response.data;
  }

  async runCode(payload: RunCodePayload): Promise<RunCodeResponse> {
    const response = await api.post<RunCodeResponse>(ROUTES.API.STUDENT.RUN_CODE, {
      code: payload.code,
      stdin: payload.stdin,
    });
    return response.data;
  }

  /** @deprecated Use submitToQueue() for shared queue visibility */
  async submitCase(payload: SubmitCasePayload): Promise<SubmitCaseResponse> {
    const response = await api.post<SubmitCaseResponse>(
      ROUTES.API.STUDENT.SUBMIT_CASE,
      payload,
    );
    return response.data;
  }

  /**
   * Submit code to the backend queue.
   * Returns immediately with job ID and queue position.
   */
  async submitToQueue(payload: SubmitToQueuePayload): Promise<SubmitToQueueResponse> {
    const response = await api.post<SubmitToQueueResponse>(
      ROUTES.API.STUDENT.SUBMISSION_SUBMIT,
      payload,
    );
    return response.data;
  }

  /**
   * Fetch all queue items for the current user.
   * Used to restore queue state after page refresh.
   */
  async getMyQueue(): Promise<BackendQueueItem[]> {
    const response = await api.get<BackendQueueItem[]>(
      ROUTES.API.STUDENT.SUBMISSION_MY_QUEUE,
    );
    return response.data;
  }

  /**
   * Get the status of a specific job (poll-based fallback).
   */
  async getJobStatus(jobId: string) {
    const response = await api.get(ROUTES.API.STUDENT.SUBMISSION_STATUS(jobId));
    return response.data;
  }

  /**
   * Get global queue statistics.
   */
  async getQueueStats(): Promise<{
    waiting: number;
    active: number;
    completed: number;
    failed: number;
  }> {
    const response = await api.get(ROUTES.API.STUDENT.SUBMISSION_STATS);
    return response.data;
  }
}

export default new CaseService();

