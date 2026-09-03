"use client";

import { CompetencyScore } from "@/types/asessment";
import { QueueItem } from "@/types/queue";
import { Loader2 } from "lucide-react";

import HintSection from "./HintSection";
import EvaluationCard from "./EvaluationCard";
import SubmissionQueue from "./SubmissionQueue";
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

  queueItems: QueueItem[];

  onQueueItemClick: (questionIndex: number) => void;

  onUseHint: () => void;
}

export default function RightPanel({
  hints,
  result,
  failedRunCount,
  openedHints,
  assessing = false,
  queueItems,
  onQueueItemClick,
  onUseHint,
}: Props) {
  return (
    <div className="space-y-6">
      {/* Evaluation result or Hints */}
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


      {/* Submission Queue Panel */}
      <SubmissionQueue items={queueItems} onItemClick={onQueueItemClick} />
    </div>
  );
}
