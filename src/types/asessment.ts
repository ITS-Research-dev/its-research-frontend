import { Scoring } from "./profile";

export type AssessmentLevel =
  | "Novice"
  | "Beginner"
  | "Advance/Beginner"
  | "Advance"
  | "Competent"
  | "Expert";

export interface CompetencyScore {
  name: string;
  score: number;
}

export interface AssessmentQuestion {
  id: string;

  question: string;

  userAnswer: string;

  correctAnswer: string;

  explanation: string;

  score: number;
}

export interface AssessmentHistoryItem {
  id: string;

  topic: string;

  title: string;

  score: number;

  level: AssessmentLevel;
}

export interface AssessmentDetail extends AssessmentHistoryItem {
  hintsUsed: number;
  duration?: string;
  feedback?: string | null;

  competencies: CompetencyScore[];
  questions?: AssessmentQuestion[];
}

export interface AssementDetailResponse {
  id: string;
  level: AssessmentLevel;
  hintUsage: number;
  averageScore: number;
  flagOverride: boolean;
  aiScore: Scoring;
  aiSuggestion: string;
  teacherScore: Scoring;
  teacherSuggestion: string;
  test: {
    title: string;
    topic: { title: string };
  };
}
