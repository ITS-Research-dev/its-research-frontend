"use client";

import { CompetencyScore } from "@/types/asessment";
import { Loader2 } from "lucide-react";

import HintSection from "./HintSection";
import EvaluationCard from "./EvaluationCard";
import Card from "../ui/Card";

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

  assessing?: boolean;

  onUseHint: () => void;
}

export default function RightPanel({
  hints,
  result,
  failedRunCount,
  openedHints,
  assessing = false,
  onUseHint,
}: Props) {
  if (assessing) {
    return (
      <div className="space-y-6">
        <Card className="flex flex-col items-center justify-center gap-4 p-8 text-center">
          <Loader2 size={40} className="animate-spin text-primary" />
          <div>
            <h3 className="font-semibold text-text">AI Sedang Menilai</h3>
            <p className="mt-1 text-sm text-description">
              Proses penilaian membutuhkan beberapa menit. Mohon tunggu...
            </p>
          </div>
        </Card>
      </div>
    );
  }

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
