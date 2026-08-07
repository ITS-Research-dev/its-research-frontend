import { AssessmentLevel } from "./asessment";

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
