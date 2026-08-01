import Card from "@/components/ui/Card";

import { MessageSquareQuote, Sparkles } from "lucide-react";

interface Props {
  feedback: string;
}

export default function FeedbackCard({ feedback }: Props) {
  return (
    <Card className="overflow-hidden border border-primary/10">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-primary/10 bg-primary/5 px-6 py-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
          <MessageSquareQuote size={22} className="text-primary" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text">Feedback</h2>

          <p className="text-sm text-description">
            Evaluasi hasil pengerjaan asesmen.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-6">
        <div className="flex items-start gap-3 rounded-2xl bg-background p-5">
          <Sparkles size={20} className="mt-1 text-primary" />

          <p className="leading-7 text-description">{feedback}</p>
        </div>
      </div>
    </Card>
  );
}
