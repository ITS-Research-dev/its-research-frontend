"use client";

import { Check } from "lucide-react";

import Button from "@/components/ui/Button";
import { CaseQuestion } from "@/types/case";

interface Props {
  questions?: CaseQuestion[];

  total: number;

  current: number;

  submittedQuestions: string[];

  onChange: (index: number) => void;
}

export default function QuestionNavigation({
  questions,
  total,
  current,
  submittedQuestions,
  onChange,
}: Props) {
  return (
    <div>
      <h3 className="mb-4 text-base font-semibold text-text">Nomor Soal</h3>

      <div className="flex flex-wrap gap-3">
        {Array.from({ length: total }).map((_, index) => {
          const active = current === index;

          const qId = questions?.[index]?.id;

          const completed =
            (qId && submittedQuestions.includes(qId)) ||
            submittedQuestions.includes(`q${index + 1}`) ||
            submittedQuestions.includes(String(index + 1));

          return (
            <Button
              key={qId || index}
              onClick={() => onChange(index)}
              variant={active ? "primary" : "outline"}
              className="relative h-11 w-11 rounded-xl p-0 font-semibold transition-all"
            >
              {index + 1}

              {completed && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-success text-white ring-2 ring-white shadow-xs">
                  <Check size={11} strokeWidth={3.5} />
                </span>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
