"use client";

import Card from "@/components/ui/Card";

interface Props {
  score: number;
}

export default function OverallScoreCard({ score }: Props) {
  const getLabel = () => {
    if (score >= 90) return "Excellent";

    if (score >= 80) return "Very Good";

    if (score >= 70) return "Good";

    if (score >= 60) return "Fair";

    return "Need Improvement";
  };

  const getColor = () => {
    if (score >= 90) return "text-success";

    if (score >= 80) return "text-primary";

    if (score >= 70) return "text-warning";

    return "text-danger";
  };

  return (
    <div className="p-5">
      <div className="mt-0 flex flex-col items-center">
        <span className={`text-6xl font-bold ${getColor()}`}>{score}</span>

        <span className={`mt-2 text-lg font-semibold ${getColor()}`}>
          {getLabel()}
        </span>
      </div>
    </div>
  );
}
