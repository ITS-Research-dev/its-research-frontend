import { SubmitCasePayload } from "@/services/case.service";
import { CompetencyScore } from "@/types/asessment";

export type QueueStatus = "queued" | "running" | "completed" | "failed";

export interface QueueItemResult {
  submitted: boolean;
  score: number;
  level: string;
  feedback: string;
  competencies: CompetencyScore[];
}

export interface QueueItem {
  /** Unique identifier for this queue entry */
  id: string;
  /** The question ID this submission is for */
  questionId: string;
  /** Display name, e.g. "Soal 1" */
  questionTitle: string;
  /** Index in the questions array, for navigation */
  questionIndex: number;
  /** Current processing status */
  status: QueueStatus;
  /** The payload to send to the API */
  payload: SubmitCasePayload;
  /** Assessment result (populated on completion) */
  result?: QueueItemResult;
  /** Error message (populated on failure) */
  error?: string;
  /** Timestamp when the item was added to the queue */
  submittedAt: number;
  /** Timestamp when processing started */
  startedAt?: number;
  /** Timestamp when processing finished */
  completedAt?: number;
}
