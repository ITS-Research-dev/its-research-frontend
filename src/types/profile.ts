import { AssessmentLevel } from "./asessment";

export interface CompetencySummary {
  name: string;
  score: number;
}

export interface CompetencyTrend {
  name: string;
  score: number;
}

export interface LevelTrend {
  name: string;
  score: number;
  color: string;
  level: AssessmentLevel;
}

export interface RawGraphProfile {
  avg: number;
  count: number;
}
export interface ProfileSummary {
  averageScore: number;
  totalHints: number;
  nameMaterials: string[];
  totalMaterials: number;
  totalCases: number;
  competencies: CompetencySummary[];
  competencyTrend: { [key: string]: {[key: string]: RawGraphProfile} };
  levelTrend: { [key: string]: {[key: string]: RawGraphProfile} };
  raw: ProfileResponse[];
}
export interface Scoring {
  [key: string]: number;
  fungsionalitas: number;
  logika: number;
  syntax: number;
  code_style: number;
  dokumentasi: number;
  konsep: number;
}

export interface ProfileResponse {
  id: string;
  averageScore: number;
  level: string;
  createdAt: string;
  hintUsage: number;
  aiScore: Scoring;
  teacherScore: Scoring;
  aiSuggestion?: string | null;
  teacherSuggestion?: string | null;
  flagOverride?: boolean;
  test: {
    title: string;
    topic: { title: string };
  };
}
