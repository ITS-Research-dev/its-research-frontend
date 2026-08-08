import { AssementDetailResponse, AssessmentDetail } from "@/types/asessment";

import {
  CompetencySummary,
  CompetencyTrend,
  LevelTrend,
  ProfileSummary,
  Scoring,
} from "@/types/profile";

function formatToCompetencies(score: Scoring | string): CompetencySummary[]{
    score = typeof score === 'string' ? JSON.parse(score) : score;
    console.log(score)
    return Object.entries(score).map(
    ([name, score]) => ({ name, score })
  );
}

export function buildProfileSummary(
  assessments: AssementDetailResponse,
): AssessmentDetail {
  let feedback = "", competencies = []
  const gradedByTeacher: boolean = assessments.teacherScore ? true : false;
  if(gradedByTeacher){
    feedback = assessments.teacherSuggestion
    competencies = formatToCompetencies(assessments.teacherScore)
  }else{
    feedback = assessments.aiSuggestion
    competencies = formatToCompetencies(assessments.aiScore)
  }
  return {
    id: assessments.id,
    topic: assessments.test.topic.title,
    title: assessments.test.title,
    score: assessments.averageScore,
    level: assessments.level,
    hintsUsed: assessments.hintUsage,
    feedback,competencies
  };
}
