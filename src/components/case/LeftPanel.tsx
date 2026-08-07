"use client";

import Card from "@/components/ui/Card";

import { CaseQuestion } from "@/types/case";

import QuestionNavigation from "./QuestionNavigation";
import QuestionCard from "./QuestionCard";

interface Props {
  question: CaseQuestion;
  questions?: CaseQuestion[];
  total: number;
  current: number;
  submittedQuestions: string[];
  onChange: (index: number) => void;
}

export default function LeftPanel({
  question,
  questions,
  total,
  current,
  submittedQuestions,
  onChange,
}: Props) {
  return (
    <Card className="p-2">
      <QuestionNavigation
        questions={questions}
        total={total}
        current={current}
        submittedQuestions={submittedQuestions}
        onChange={onChange}
      />

      <div className="my-6 border-t border-border" />

      <QuestionCard question={question} />
    </Card>
  );
}
