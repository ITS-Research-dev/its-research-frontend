"use client";

import { useState } from "react";
import { CompetencyScore } from "@/types/asessment";
import { QueueItem } from "@/types/queue";

import HintSection from "./HintSection";
import EvaluationCard from "./EvaluationCard";
import SubmissionQueue from "./SubmissionQueue";

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
  queueItems,
  onQueueItemClick,
  onUseHint,
}: Props) {
  const [activeTab, setActiveTab] = useState<"result" | "hints">("result");

  return (
    <div className="space-y-6">
      {/* Evaluation result or Hints */}
      {result?.submitted ? (
        <div className="space-y-4">
          <div className="flex rounded-xl bg-gray-100 p-1 border border-border">
            <button
              onClick={() => setActiveTab("result")}
              className={`flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all ${
                activeTab === "result"
                  ? "bg-white text-primary shadow-sm"
                  : "text-description hover:text-text"
              }`}
            >
              Hasil Penilaian
            </button>
            <button
              onClick={() => setActiveTab("hints")}
              className={`flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all ${
                activeTab === "hints"
                  ? "bg-white text-primary shadow-sm"
                  : "text-description hover:text-text"
              }`}
            >
              Petunjuk ({openedHints.length}/{hints.length})
            </button>
          </div>

          {activeTab === "result" ? (
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
