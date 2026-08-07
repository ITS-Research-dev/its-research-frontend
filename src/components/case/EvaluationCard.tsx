"use client";

import { CompetencyScore } from "@/types/asessment";
import OverallScoreCard from "./OverallScoreCard";
import LevelBadge from "./LevelBadge";
import FeedbackCard from "./FeedbackCard";
import CompetencyRadar from "./CompetencyRadar";
import Card from "../ui/Card";

interface Props {
  score: number;
  level: string;
  feedback: string;
  competencies: CompetencyScore[];
}

export default function EvaluationCard({
  score,
  level,
  feedback,
  competencies,
}: Props) {
  return (
    <Card className="space-y-5">
      <div className="flex flex-col justify-center items-center gap-2">
        <h3 className="text-lg font-semibold text-text">Nilai Keseluruhan</h3>
        {/* Level */}
        <LevelBadge level={level} />
      </div>

      {/* Nilai Keseluruhan */}
      <OverallScoreCard score={score} />

      {/* Feedback AI */}
      <FeedbackCard feedback={feedback} />

      {/* Detail Kompetensi */}
      <CompetencyRadar competencies={competencies} />
    </Card>
  );
}
