import { CompetencyScore } from "@/types/asessment";

export function calculateOverallScore(competencies: CompetencyScore[]): number {
  if (competencies.length === 0) {
    return 0;
  }

  const total = competencies.reduce(
    (sum, competency) => sum + competency.score,
    0,
  );

  return Math.round(total / competencies.length);
}
