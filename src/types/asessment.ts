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

  duration: string;

  feedback: string;

  competencies: CompetencyScore[];

  questions: AssessmentQuestion[];
}
