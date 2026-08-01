import { AssessmentLevel } from "./asessment";

export interface CompetencySummary {
  name: string;
  score: number;
}

export interface CompetencyTrend {
  topic: string;
  averageScore: number;
}

export interface LevelTrend {
  topic: string;
  level: AssessmentLevel;
}

export interface ProfileSummary {
  averageScore: number;
  totalHints: number;
  totalMaterials: number;
  totalCases: number;
  competencies: CompetencySummary[];
  competencyTrend: CompetencyTrend[];
  levelTrend: LevelTrend[];
}
