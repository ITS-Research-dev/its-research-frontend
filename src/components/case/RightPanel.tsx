"use client";

import { CompetencyScore } from "@/types/asessment";

import HintSection from "./HintSection";
import EvaluationCard from "./EvaluationCard";

interface QuestionResult {
  submitted: boolean;

  score: number;

  level: string;

  feedback: string;

  competencies: CompetencyScore[];
}

interface Props {
  hints: string[];

  result?: QuestionResult;

  failedRunCount: number;

  openedHints: number[];

  onUseHint: () => void;
}

export default function RightPanel({
  hints,
  result,
  failedRunCount,
  openedHints,
  onUseHint,
}: Props) {
  return (
    <div className="space-y-6">
      {result?.submitted ? (
        <EvaluationCard
          score={result.score}
          level={result.level}
          feedback={result.feedback}
          competencies={result.competencies}
        />
      ) : (
        <HintSection
          hints={hints}
          failedRunCount={failedRunCount}
          openedHints={openedHints}
          onUseHint={onUseHint}
        />
      )}
    </div>
  );
}
