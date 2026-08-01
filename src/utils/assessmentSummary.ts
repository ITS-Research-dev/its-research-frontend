import { AssessmentDetail } from "@/types/asessment";

import {
  CompetencySummary,
  CompetencyTrend,
  LevelTrend,
  ProfileSummary,
} from "@/types/profile";

export function buildProfileSummary(
  assessments: AssessmentDetail[],
): ProfileSummary {
  if (assessments.length === 0) {
    return {
      averageScore: 0,

      totalHints: 0,

      totalMaterials: 0,

      totalCases: 0,

      competencies: [],

      competencyTrend: [],

      levelTrend: [],
    };
  }

  // ==========================
  // Average Score
  // ==========================

  const averageScore =
    assessments.reduce((sum, item) => sum + item.score, 0) / assessments.length;

  // ==========================
  // Total Hint
  // ==========================

  const totalHints = assessments.reduce((sum, item) => sum + item.hintsUsed, 0);

  // ==========================
  // Kompetensi (Rata-rata)
  // ==========================

  const competencyMap = new Map<
    string,
    {
      total: number;
      count: number;
    }
  >();

  assessments.forEach((assessment) => {
    assessment.competencies.forEach((competency) => {
      const current = competencyMap.get(competency.name);

      if (current) {
        current.total += competency.score;

        current.count += 1;
      } else {
        competencyMap.set(competency.name, {
          total: competency.score,

          count: 1,
        });
      }
    });
  });

  const competencies: CompetencySummary[] = Array.from(
    competencyMap.entries(),
  ).map(([name, value]) => ({
    name,

    score: Math.round(value.total / value.count),
  }));

  // ==========================
  // Trend Kompetensi
  // ==========================

  const competencyTrend: CompetencyTrend[] = assessments.map((item) => ({
    topic: item.topic,

    averageScore: item.score,
  }));

  // ==========================
  // Trend Level
  // ==========================

  const levelTrend: LevelTrend[] = assessments.map((item) => ({
    topic: item.topic,

    level: item.level,
  }));

  return {
    averageScore: Math.round(averageScore),

    totalHints,

    totalMaterials: assessments.length,

    totalCases: assessments.length,

    competencies,

    competencyTrend,

    levelTrend,
  };
}
