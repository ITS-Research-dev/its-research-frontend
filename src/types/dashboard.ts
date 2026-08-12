import { AssessmentLevel } from "./asessment";
import { RawGraphProfile } from "./profile";

export interface TeacherDashboardSummary {
  totalStudents: number;

  averageAssessmentTime: string;

  averageScore: number;
}

export interface TopicScore {
  topic: string;

  score: number;
}

export interface AIEfficiency {
  percentage: number;

  manualTime: string;

  aiTime: string;

  description: string;
}

export interface DashboardTrendResponse {
  nameMaterials: string[];
  competencyTrend: { [key: string]: { [key: string]: RawGraphProfile } };
  levelTrend: { [key: string]: { [key: string]: RawGraphProfile } };
}

export interface DashboardResponse {
  summary: TeacherDashboardSummary;
  topicScores: TopicScore[];
}
