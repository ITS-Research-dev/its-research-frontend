"use client";

import Card from "@/components/ui/Card";
import { Sparkles } from "lucide-react";

interface Props {
  feedback: string;
}

export default function FeedbackCard({ feedback }: Props) {
  return (
    <div className="p-5">
      <div className="flex items-center gap-2">
        <Sparkles size={20} className="text-primary" />

        <h3 className="font-semibold text-text">Feedback AI</h3>
      </div>

      <p className="mt-4 whitespace-pre-wrap leading-7 text-description text-sm">
        {feedback}
      </p>
    </div>
  );
}
